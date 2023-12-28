import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'
import { getStorage } from 'firebase/storage'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDrQvNXtWRuMUK1q682GKIij34m8WFWT_w",
  authDomain: "alexs-science-games.firebaseapp.com",
  projectId: "alexs-science-games",
  storageBucket: "alexs-science-games.appspot.com",
  messagingSenderId: "18697842297",
  appId: "1:18697842297:web:2082bf90ee8668b619eea8",
  measurementId: "G-PMMMECCMN3"
};

const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
export const storage = getStorage()

// export const db = getDatabase(app)
export  const db = getFirestore(app)

export const auth = getAuth(app)

export default app