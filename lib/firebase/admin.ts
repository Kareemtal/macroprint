import * as admin from 'firebase-admin'

// Initialize Firebase Admin SDK for server-side operations
// This gives us full access to Firestore without requiring user authentication

let adminApp: admin.app.App

export function getAdminApp(): admin.app.App {
    if (!adminApp) {
        if (admin.apps.length === 0) {
            // Try to load service account from environment variable
            const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT

            if (serviceAccount) {
                // Initialize with service account credentials
                try {
                    console.log('[Firebase Admin] Service account length:', serviceAccount.length)
                    console.log('[Firebase Admin] First 100 chars:', serviceAccount.substring(0, 100))

                    const credentials = JSON.parse(serviceAccount)
                    console.log('[Firebase Admin] Parsed successfully, has type:', credentials.type)

                    adminApp = admin.initializeApp({
                        credential: admin.credential.cert(credentials),
                        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
                    })
                    console.log('[Firebase Admin] Initialized with service account')
                } catch (error) {
                    console.error('[Firebase Admin] Failed to parse service account:', error)
                    console.error('[Firebase Admin] Error message:', error instanceof Error ? error.message : 'Unknown')
                    throw new Error('Invalid Firebase service account credentials')
                }
            } else {
                // Fallback: Initialize with just project ID
                // This works in some environments but may have limited permissions
                console.warn('[Firebase Admin] No service account found, using project ID only')
                adminApp = admin.initializeApp({
                    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
                })
            }
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
