'use client'

import { useAuth } from '@/lib/context/auth-context'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getInitials } from '@/lib/utils'
import { useState, useEffect, useCallback } from 'react'
import { auth } from '@/lib/firebase/config'

interface AdminUser {
    uid: string
    email: string
    displayName: string | null
    plan: string
    createdAt: string | null
    exportCountToday: number
    bonusExports: number
    isAdmin: boolean
}

function AdminUserManagement() {
    const [users, setUsers] = useState<AdminUser[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [grantingCredits, setGrantingCredits] = useState<string | null>(null)
    const [creditInputs, setCreditInputs] = useState<Record<string, string>>({})

    const fetchUsers = useCallback(async () => {
        try {
            setLoading(true)
            setError(null)

            const token = await auth.currentUser?.getIdToken()
            if (!token) {
                setError('Not authenticated')
                return
            }

            const response = await fetch('/api/admin/users', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })

            if (!response.ok) {
                const data = await response.json()
                throw new Error(data.error || 'Failed to fetch users')
            }

            const data = await response.json()
            setUsers(data.users)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch users')
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchUsers()
    }, [fetchUsers])

    const handleGrantCredits = async (targetUid: string) => {
        const credits = parseInt(creditInputs[targetUid] || '0', 10)
        if (credits <= 0) {
            alert('Please enter a positive number of credits')
            return
        }

        try {
            setGrantingCredits(targetUid)
            const token = await auth.currentUser?.getIdToken()

            const response = await fetch('/api/admin/grant-credits', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ targetUid, credits }),
            })

            if (!response.ok) {
                const data = await response.json()
                throw new Error(data.error || 'Failed to grant credits')
            }

            // Clear input and refresh users
            setCreditInputs(prev => ({ ...prev, [targetUid]: '' }))
            await fetchUsers()
        } catch (err) {
            alert(err instanceof Error ? err.message : 'Failed to grant credits')
        } finally {
            setGrantingCredits(null)
        }
    }

    const formatDate = (dateStr: string | null) => {
        if (!dateStr) return 'N/A'
        return new Date(dateStr).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        })
    }

    if (loading) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>👑 User Management</CardTitle>
                    <CardDescription>Loading users...</CardDescription>
                </CardHeader>
            </Card>
        )
    }

    if (error) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>👑 User Management</CardTitle>
                    <CardDescription className="text-red-500">{error}</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button onClick={fetchUsers} variant="outline">Retry</Button>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>👑 User Management</CardTitle>
                <CardDescription>
                    View all registered users and manage their export credits.
                    <span className="ml-2 font-semibold">Total users: {users.length}</span>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b">
                                <th className="text-left py-3 px-2 font-medium">Email</th>
                                <th className="text-left py-3 px-2 font-medium">Plan</th>
                                <th className="text-left py-3 px-2 font-medium">Signed Up</th>
                                <th className="text-center py-3 px-2 font-medium">Exports Today</th>
                                <th className="text-center py-3 px-2 font-medium">Bonus Credits</th>
                                <th className="text-left py-3 px-2 font-medium">Grant Credits</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.uid} className="border-b hover:bg-muted/50">
                                    <td className="py-3 px-2">
                                        <div className="flex items-center gap-2">
                                            {user.email}
                                            {user.isAdmin && (
                                                <span className="text-xs bg-yellow-100 text-yellow-800 px-1.5 py-0.5 rounded">
                                                    Admin
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="py-3 px-2">
                                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${user.plan === 'PRO' ? 'bg-purple-100 text-purple-800' :
                                                user.plan === 'BASIC' ? 'bg-blue-100 text-blue-800' :
                                                    'bg-gray-100 text-gray-800'
                                            }`}>
                                            {user.plan}
                                        </span>
                                    </td>
                                    <td className="py-3 px-2 text-muted-foreground">
                                        {formatDate(user.createdAt)}
                                    </td>
                                    <td className="py-3 px-2 text-center">
                                        {user.exportCountToday}
                                    </td>
                                    <td className="py-3 px-2 text-center">
                                        <span className={user.bonusExports > 0 ? 'text-green-600 font-medium' : ''}>
                                            {user.bonusExports}
                                        </span>
                                    </td>
                                    <td className="py-3 px-2">
                                        <div className="flex items-center gap-2">
                                            <Input
                                                type="number"
                                                min="1"
                                                placeholder="0"
                                                className="w-20 h-8"
                                                value={creditInputs[user.uid] || ''}
                                                onChange={(e) => setCreditInputs(prev => ({
                                                    ...prev,
                                                    [user.uid]: e.target.value
                                                }))}
                                            />
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => handleGrantCredits(user.uid)}
                                                disabled={grantingCredits === user.uid}
                                            >
                                                {grantingCredits === user.uid ? '...' : 'Grant'}
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="mt-4 flex justify-end">
                    <Button onClick={fetchUsers} variant="outline" size="sm">
                        Refresh List
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default function SettingsPage() {
    const { user, profile } = useAuth()
    const isAdmin = profile?.isAdmin === true

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
                <p className="text-muted-foreground">
                    Manage your account settings and preferences.
                </p>
            </div>

            {/* Admin User Management - Only visible to admins */}
            {isAdmin && <AdminUserManagement />}

            <Card>
                <CardHeader>
                    <CardTitle>Profile</CardTitle>
                    <CardDescription>
                        Your personal information and account details.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-20 w-20">
                            <AvatarImage src={user?.photoURL || undefined} alt={user?.displayName || 'User'} />
                            <AvatarFallback className="text-lg">
                                {getInitials(user?.displayName || user?.email || 'U')}
                            </AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                            <h3 className="font-medium leading-none">{user?.displayName || 'User'}</h3>
                            <p className="text-sm text-muted-foreground">{user?.email}</p>
                        </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="displayName">Display Name</Label>
                            <Input
                                id="displayName"
                                defaultValue={user?.displayName || ''}
                                disabled
                                placeholder="Your display name"
                            />
                            <p className="text-[0.8rem] text-muted-foreground">
                                Display name updates detailed in <span className="font-mono">firebase.json</span> are currently managed by the authentication provider.
                            </p>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                defaultValue={user?.email || ''}
                                disabled
                                placeholder="Your email address"
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Subscription</CardTitle>
                    <CardDescription>
                        Manage your subscription plan.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                            <div className="font-medium">Current Plan: {profile?.plan || 'FREE'}</div>
                            <div className="text-sm text-muted-foreground">
                                {profile?.plan === 'PRO' ? 'You have access to all premium features.' : 'Upgrade to Pro for unlimited access.'}
                            </div>
                        </div>
                        <Button variant="outline" asChild>
                            <a href="/dashboard/billing">Manage Subscription</a>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
