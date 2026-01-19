import { NextRequest, NextResponse } from 'next/server'
import { getAdminDb } from '@/lib/firebase/admin'

// GET /api/admin/users - Fetch all users (admin only)
export async function GET(request: NextRequest) {
    try {
        // Get the authorization token from the request
        const authHeader = request.headers.get('authorization')
        if (!authHeader?.startsWith('Bearer ')) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const token = authHeader.split('Bearer ')[1]

        // Verify the token and get user info
        const { getAdminAuth } = await import('@/lib/firebase/admin')
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

        // Fetch all users
        const usersSnapshot = await db.collection('users').orderBy('createdAt', 'desc').get()

        const users = usersSnapshot.docs.map(doc => {
            const data = doc.data()
            return {
                uid: doc.id,
                email: data.email || '',
                displayName: data.displayName || null,
                plan: data.plan || 'FREE',
                createdAt: data.createdAt?.toDate?.()?.toISOString() || null,
                exportCountToday: data.exportCountToday || 0,
                bonusExports: data.bonusExports || 0,
                isAdmin: data.isAdmin || false,
            }
        })

        return NextResponse.json({ users, total: users.length })
    } catch (error) {
        console.error('Error fetching users:', error)
        return NextResponse.json(
            { error: 'Failed to fetch users', details: String(error) },
            { status: 500 }
        )
    }
}
