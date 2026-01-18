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

// Check if Firebase config is valid
const isConfigValid = firebaseConfig.apiKey && firebaseConfig.projectId

let app: FirebaseApp | null = null
let auth: Auth | null = null
let db: Firestore | null = null
let storage: FirebaseStorage | null = null

function getFirebaseApp(): FirebaseApp {
  if (!isConfigValid) {
    throw new Error('Firebase configuration is missing. Please set environment variables.')
  }
  
  if (!app) {
    app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0]
  }
  return app
}

function getFirebaseAuth(): Auth {
  if (!auth) {
    auth = getAuth(getFirebaseApp())
  }
  return auth
}

function getFirebaseDb(): Firestore {
  if (!db) {
    db = getFirestore(getFirebaseApp())
  }
  return db
}

function getFirebaseStorage(): FirebaseStorage {
  if (!storage) {
    storage = getStorage(getFirebaseApp())
  }
  return storage
}

// Export getters for lazy initialization
export {
  getFirebaseApp as getApp,
  getFirebaseAuth as getAuth,
  getFirebaseDb as getDb,
  getFirebaseStorage as getStorage,
}

// For backward compatibility - these will throw if called during build without env vars
export const auth = isConfigValid ? getFirebaseAuth() : (null as unknown as Auth)
export const db = isConfigValid ? getFirebaseDb() : (null as unknown as Firestore)
export const storage = isConfigValid ? getFirebaseStorage() : (null as unknown as FirebaseStorage)
