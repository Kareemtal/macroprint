import { initializeApp, getApps, FirebaseApp } from 'firebase/app'
import { getAuth, Auth } from 'firebase/auth'
import { getFirestore, Firestore } from 'firebase/firestore'
import { getStorage, FirebaseStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
}

interface FirebaseServices {
  app: FirebaseApp
  auth: Auth
  db: Firestore
  storage: FirebaseStorage
}

function initFirebase(): FirebaseServices {
  const firebaseApp = !getApps().length
    ? initializeApp(firebaseConfig)
    : getApps()[0]

  const firebaseAuth = getAuth(firebaseApp)
  const firebaseDb = getFirestore(firebaseApp)
  const firebaseStorage = getStorage(firebaseApp)

  return {
    app: firebaseApp,
    auth: firebaseAuth,
    db: firebaseDb,
    storage: firebaseStorage,
  }
}

const firebase = initFirebase()

export const app = firebase.app
export const auth = firebase.auth
export const db = firebase.db
export const storage = firebase.storage

export default firebase
