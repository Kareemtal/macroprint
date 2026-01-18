import { initializeApp, getApps, FirebaseApp } from 'firebase/app'
import { getAuth, Auth } from 'firebase/auth'
import { getFirestore, Firestore } from 'firebase/firestore'
import { getStorage as getFirebaseStorageSDK, FirebaseStorage } from 'firebase/storage'

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

let _app: FirebaseApp | null = null
let _auth: Auth | null = null
let _db: Firestore | null = null
let _storage: FirebaseStorage | null = null

function getFirebaseApp(): FirebaseApp {
  if (!isConfigValid) {
    throw new Error('Firebase configuration is missing. Please set environment variables.')
  }

  if (!_app) {
    _app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0]
  }
  return _app
}

function getFirebaseAuth(): Auth {
  if (!_auth) {
    _auth = getAuth(getFirebaseApp())
  }
  return _auth
}

function getFirebaseDb(): Firestore {
  if (!_db) {
    _db = getFirestore(getFirebaseApp())
  }
  return _db
}

function getFirebaseStorage(): FirebaseStorage {
  if (!_storage) {
    _storage = getFirebaseStorageSDK(getFirebaseApp())
  }
  return _storage
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
