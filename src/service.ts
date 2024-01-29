import {addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, setDoc} from 'firebase/firestore'
import {auth, db, storage} from './firebase.ts'
import {deleteObject, ref} from 'firebase/storage'
import {toastifyError} from './ToastifyError.tsx'
import {useEffect, useState} from 'react'
import {User, onAuthStateChanged, createUserWithEmailAndPassword as createUserWithEmailAndPassword_} from 'firebase/auth'
import {RunData} from "src/ejudgeAPI.ts";
import {NumericalString} from "src/types.ts";

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


export const addRunId = async (runData:RunData, user, id:string) => {
  if (user === null) return
  addDoc(collection(db, `users/${user.uid}/questions/${id}/runs`), runData)
}

export const markAsSolvedCorrectly = async (question_id:string, user) => {
  if (user === null) return
  setDoc(doc(db, `users/${user.uid}/questions/`,question_id), { solvedCorrectly: true }, { merge: true });
}



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

export const deleteTodo = (todo, user) => {
  if (user === null) return
  deleteDoc(doc(db, `users/${user.uid}/todos`, todo.id))
  const desertRef = ref(storage, todo.imgUrl)
  deleteObject(desertRef).then(() => {
  }).catch((error) => {
    toastifyError(error)
  })
}

