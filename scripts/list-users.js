/**
 * Script to list all users in the database
 * Run with: node scripts/list-users.js
 */

const admin = require('firebase-admin')
const path = require('path')
const fs = require('fs')

// Check if we have the service account in Downloads
const downloadsPath = path.join(process.env.HOME, 'Downloads/ghost-caddie-firebase-adminsdk-fbsvc-49dee77f16.json')

let serviceAccount
if (fs.existsSync(downloadsPath)) {
    serviceAccount = require(downloadsPath)
} else {
    console.error('Service account file not found in Downloads!')
    process.exit(1)
}

// Initialize Firebase Admin
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
})

const db = admin.firestore()

async function listUsers() {
    console.log('Listing all users in the database...\n')

    const usersRef = db.collection('users')
    const snapshot = await usersRef.get()

    if (snapshot.empty) {
        console.log('No users found in the database.')
        process.exit(0)
    }

    console.log(`Found ${snapshot.size} user(s):\n`)

    snapshot.forEach((doc) => {
        const data = doc.data()
        console.log(`ID: ${doc.id}`)
        console.log(`  Email: ${data.email || 'Not set'}`)
        console.log(`  Plan: ${data.plan || 'Not set'}`)
        console.log(`  isAdmin: ${data.isAdmin || false}`)
        console.log('')
    })

    process.exit(0)
}

listUsers().catch((error) => {
    console.error('Error:', error)
    process.exit(1)
})
