import { NextRequest, NextResponse } from 'next/server'
import { getAdminDb, getAdminAuth } from '@/lib/firebase/admin'

// POST /api/admin/grant-credits - Grant bonus exports to a user (admin only)
export async function POST(request: NextRequest) {
    try {
        // Get the authorization token from the request
        const authHeader = request.headers.get('authorization')
        if (!authHeader?.startsWith('Bearer ')) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const token = authHeader.split('Bearer ')[1]

        // Verify the token and get user info
        const auth = getAdminAuth()

        let decodedToken
        try {
            decodedToken = await auth.verifyIdToken(token)
        } catch {
            return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
        }

        // Check if the requesting user is an admin
        const db = getAdminDb()
        const adminDoc = await db.collection('users').doc(decodedToken.uid).get()

        if (!adminDoc.exists || !adminDoc.data()?.isAdmin) {
            return NextResponse.json({ error: 'Forbidden - Admin access required' }, { status: 403 })
        }

        // Parse request body
        const body = await request.json()
        const { targetUid, credits } = body

        if (!targetUid || typeof credits !== 'number' || credits < 0) {
            return NextResponse.json(
                { error: 'Invalid request - targetUid and credits (positive number) required' },
                { status: 400 }
            )
        }

        // Update the target user's bonusExports
        const targetUserRef = db.collection('users').doc(targetUid)
        const targetUserDoc = await targetUserRef.get()

        if (!targetUserDoc.exists) {
            return NextResponse.json({ error: 'Target user not found' }, { status: 404 })
        }

        const currentBonus = targetUserDoc.data()?.bonusExports || 0
        const newBonus = currentBonus + credits

        await targetUserRef.update({
            bonusExports: newBonus,
        })

        // Log the action
        await db.collection('auditEvents').add({
            uid: decodedToken.uid,
            type: 'ADMIN_GRANTED_CREDITS',
            targetUid,
            timestamp: new Date(),
            metadata: {
                creditsGranted: credits,
                previousBonus: currentBonus,
                newBonus,
            },
        })

        return NextResponse.json({
            success: true,
            message: `Granted ${credits} bonus exports to user`,
            newBonusTotal: newBonus,
        })
    } catch (error) {
        console.error('Error granting credits:', error)
        return NextResponse.json(
            { error: 'Failed to grant credits', details: String(error) },
            { status: 500 }
        )
    }
}
