'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { User } from 'firebase/auth'
import { onAuthChange, getUserProfile, signInWithGoogle, signOut } from '@/lib/firebase/auth'
import type { UserProfile } from '@/lib/types'

interface AuthContextValue {
  user: User | null
  profile: UserProfile | null
  isLoading: boolean
  isAuthenticated: boolean
  signIn: () => Promise<void>
  signOut: () => Promise<void>
  refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthChange(async (firebaseUser) => {
      setUser(firebaseUser)
      
      if (firebaseUser) {
        const userProfile = await getUserProfile(firebaseUser.uid)
        setProfile(userProfile)
      } else {
        setProfile(null)
      }
      
      setIsLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const handleSignIn = async () => {
    try {
      setIsLoading(true)
      await signInWithGoogle()
    } catch (error) {
      console.error('Sign in error:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignOut = async () => {
    try {
      setIsLoading(true)
      await signOut()
      setUser(null)
      setProfile(null)
    } catch (error) {
      console.error('Sign out error:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const refreshProfile = async () => {
    if (user) {
      const updatedProfile = await getUserProfile(user.uid)
      setProfile(updatedProfile)
    }
  }

  const value: AuthContextValue = {
    user,
    profile,
    isLoading,
    isAuthenticated: !!user,
    signIn: handleSignIn,
    signOut: handleSignOut,
    refreshProfile,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
