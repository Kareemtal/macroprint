/**
 * Script to grant admin rights with unlimited exports to a user
 * Run with: node scripts/grant-admin.js
 */

const admin = require('firebase-admin')
const path = require('path')
const fs = require('fs')

// Check if we have the service account in Downloads
const downloadsPath = path.join(process.env.HOME, 'Downloads/ghost-caddie-firebase-adminsdk-fbsvc-49dee77f16.json')

let serviceAccount
if (fs.existsSync(downloadsPath)) {
    serviceAccount = require(downloadsPath)
    console.log('✓ Loaded service account from Downloads')
} else {
    console.error('Service account file not found in Downloads!')
    process.exit(1)
}

// Initialize Firebase Admin
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
})

const db = admin.firestore()

async function grantAdminRights(email) {
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
