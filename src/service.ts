import {addDoc, collection, doc, increment, onSnapshot, orderBy, query, setDoc} from 'firebase/firestore'
import {auth, db} from './firebase.ts'
import {useEffect, useState} from 'react'
import {
  createUserWithEmailAndPassword as createUserWithEmailAndPassword_,
  onAuthStateChanged,
  User
} from 'firebase/auth'
import {RunData} from "src/ejudgeAPI.ts";

export const createUserWithEmailAndPassword=(email, password) => {
  return createUserWithEmailAndPassword_(auth, email, password).then(()=>addDoc(collection(db, 'users'), {}))
}

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null)
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid
        // ...
        // console.log('uid', uid)
        setUser(user)
      } else {
        // User is signed out
        // ...
        // console.log('user is logged out')
        setUser(null)
      }
    })
  }, [])
  return user
}

export const addRunId = async (runData:RunData, user, questionId:string) => {
  if (user === null) return
  addDoc(collection(db, `users/${user.uid}/questions/${questionId}/runs`), runData)
}

export const markAsSolvedCorrectly = async (questionId:string, userId:string,courseId:string) => {
  setDoc(doc(db, `users/${userId}/questions/`,questionId), { solvedCorrectly: true }, { merge: true });
//fixme but keep in mind that you can update a single document only once per second. If you need to update your counter above this rate, see the Distributed counters page
  setDoc(doc(db, `users/${userId}/courses/`,courseId), {
    solvedCorrectly: increment(1)
  },{ merge: true })
}

// todo replace below with react-firebase-hooks lib
type ExcludeKeys<T,ExcludedKeys extends string="id"> = {
  [K in keyof T]: T[K]
} & {
  [K in ExcludedKeys]?: never
}
export const useCollection = <CollectionType extends ExcludeKeys<object&{timestamp:number}>>(path:string|null) => {
  const [collectionContents, setCollectionContents] = useState<CollectionType[]>([])
  useEffect(() => {
    if(path===null) return
    const q = query(collection(db, path), orderBy('timestamp', 'asc'))
    onSnapshot(q, (snapshot) => {
      setCollectionContents(snapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as CollectionType)
      })))
    })
  }, [path])
  return collectionContents
}

