'use client'

import { useAuth } from '@/lib/context/auth-context'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getInitials } from '@/lib/utils'

export default function SettingsPage() {
    const { user, profile } = useAuth()

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
                <p className="text-muted-foreground">
                    Manage your account settings and preferences.
                </p>
            </div>

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
