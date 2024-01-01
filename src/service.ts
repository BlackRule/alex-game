import {addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query} from 'firebase/firestore'
import {auth, db, storage} from './firebase.ts'
import {deleteObject, ref} from 'firebase/storage'
import {toastifyError} from './ToastifyError.tsx'
import {useEffect, useState} from 'react'
import {User, onAuthStateChanged, createUserWithEmailAndPassword as createUserWithEmailAndPassword_} from 'firebase/auth'
import {NumericalString, RunData} from "src/types.ts";

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


export const addRunId = async (runId:NumericalString, user, id:string) => {
  if (user === null) return
  addDoc(collection(db, `users/${user.uid}/problems/${id}/runs`), {id:runId} as RunData)
}

/*export const useTodos = (user) => {
  const [todos, setTodos] = useState<TodoType[]>([])
  useEffect(() => {
    if (user === null) return
    const q = query(collection(db, `users/${user.uid}/todos`), orderBy('timestamp', 'desc'))

    onSnapshot(q, (snapshot) => {
      setTodos(snapshot.docs.map(doc => ({
        id: doc.id,
        imgUrl: doc.data().imgUrl,
        text: doc.data().text,
        timestamp: doc.data().timestamp
      })))
      // snapshot.docs.map(doc => console.log(doc))
      // console.log(snapshot.docs)
    })
  }, [user]) //deps were [input]
  return todos
}*/

export const deleteTodo = (todo, user) => {
  if (user === null) return
  deleteDoc(doc(db, `users/${user.uid}/todos`, todo.id))
  const desertRef = ref(storage, todo.imgUrl)
  deleteObject(desertRef).then(() => {
  }).catch((error) => {
    toastifyError(error)
  })
}

