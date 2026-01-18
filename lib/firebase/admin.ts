import * as admin from 'firebase-admin'

// Initialize Firebase Admin SDK for server-side operations
// This gives us full access to Firestore without requiring user authentication

let adminApp: admin.app.App

export function getAdminApp(): admin.app.App {
    if (!adminApp) {
        if (admin.apps.length === 0) {
            // Initialize with automatic credentials from environment
            // Vercel/Cloud environments automatically provide credentials
            adminApp = admin.initializeApp({
                projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
            })
        } else {
            adminApp = admin.apps[0] as admin.app.App
        }
    }
    return adminApp
}

export function getAdminDb(): admin.firestore.Firestore {
    return getAdminApp().firestore()
}

export function getAdminAuth(): admin.auth.Auth {
    return getAdminApp().auth()
}
