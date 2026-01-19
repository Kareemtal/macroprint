/**
 * Script to grant admin rights with unlimited exports to a user
 * Run with: npx ts-node --project tsconfig.scripts.json scripts/grant-admin.ts
 */

import * as admin from 'firebase-admin'
import * as path from 'path'
import * as fs from 'fs'

// Load the service account key
const serviceAccountPath = path.join(__dirname, '../ghost-caddie-firebase-adminsdk-fbsvc-49dee77f16.json')

// Check if we have the service account in the project root or Downloads
let serviceAccount: admin.ServiceAccount
if (fs.existsSync(serviceAccountPath)) {
    serviceAccount = require(serviceAccountPath)
} else {
    // Try loading from Downloads
    const downloadsPath = process.env.HOME + '/Downloads/ghost-caddie-firebase-adminsdk-fbsvc-49dee77f16.json'
    if (fs.existsSync(downloadsPath)) {
        serviceAccount = require(downloadsPath)
    } else {
        console.error('Service account file not found!')
        process.exit(1)
    }
}

// Initialize Firebase Admin
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
})

const db = admin.firestore()

async function grantAdminRights(email: string) {
    console.log(`Looking for user with email: ${email}`)

    // Find user by email
    const usersRef = db.collection('users')
    const snapshot = await usersRef.where('email', '==', email).get()

    if (snapshot.empty) {
        console.error(`No user found with email: ${email}`)
        process.exit(1)
    }

    const userDoc = snapshot.docs[0]
    const userId = userDoc.id
    const userData = userDoc.data()

    console.log(`Found user: ${userId}`)
    console.log(`Current plan: ${userData.plan || 'Not set'}`)

    // Update user to PRO plan with admin flag
    await userDoc.ref.update({
        plan: 'PRO',
        isAdmin: true,
        adminGrantedAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    })

    console.log(`✅ Successfully granted admin rights to ${email}`)
    console.log(`   - Plan: PRO (unlimited exports)`)
    console.log(`   - Admin: true`)

    process.exit(0)
}

// Run the script
const targetEmail = 'authertalon@gmail.com'
grantAdminRights(targetEmail).catch((error) => {
    console.error('Error:', error)
    process.exit(1)
})
