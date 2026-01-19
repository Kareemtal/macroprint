/**
 * Script to repair user documents
 * run with: node scripts/repair-users.js
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

async function repairUsers() {
    console.log('Checking all users for missing fields...\n')

    const usersRef = db.collection('users')
    const snapshot = await usersRef.get()

    if (snapshot.empty) {
        console.log('No users found.')
        process.exit(0)
    }

    let updatedCount = 0

    const updates = []

    snapshot.forEach((doc) => {
        const data = doc.data()
        const update = {}
        let needsUpdate = false

        // Check for missing plan
        if (!data.plan) {
            console.log(`User ${doc.id} (${data.email}) missing plan. Setting to FREE.`)
            update.plan = 'FREE'
            needsUpdate = true
        }

        // Check for missing isAdmin
        if (data.isAdmin === undefined) {
            console.log(`User ${doc.id} (${data.email}) missing isAdmin. Setting to false.`)
            update.isAdmin = false
            needsUpdate = true
        }

        // Check for missing export counts
        if (data.exportCountToday === undefined) {
            console.log(`User ${doc.id} (${data.email}) missing exportCountToday. Setting to 0.`)
            update.exportCountToday = 0
            needsUpdate = true
        }

        if (data.bonusExports === undefined) {
            console.log(`User ${doc.id} (${data.email}) missing bonusExports. Setting to 0.`)
            update.bonusExports = 0
            needsUpdate = true
        }

        // Migration: created_at -> createdAt
        if (!data.createdAt && data.created_at) {
            console.log(`User ${doc.id} (${data.email}) has legacy created_at. Migrating to createdAt.`)
            update.createdAt = data.created_at
            needsUpdate = true
        } else if (!data.createdAt && !data.created_at) {
            // Fallback if neither exists
            console.log(`User ${doc.id} (${data.email}) missing createdAt. Setting to now.`)
            update.createdAt = admin.firestore.FieldValue.serverTimestamp()
            needsUpdate = true
        }

        if (needsUpdate) {
            updates.push(doc.ref.update(update))
            updatedCount++
        }
    })

    if (updates.length > 0) {
        await Promise.all(updates)
        console.log(`\nSuccessfully updated ${updatedCount} users.`)
    } else {
        console.log('\nAll users appear to have valid data.')
    }

    process.exit(0)
}

repairUsers().catch((error) => {
    console.error('Error:', error)
    process.exit(1)
})
