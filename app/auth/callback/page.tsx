'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { Loader2 } from 'lucide-react'
import { useTheme } from '@/components/theme-provider'

export default function AuthCallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { data: session, status } = useSession()
  const { setTheme } = useTheme()

  useEffect(() => {
    if (status === 'authenticated') {
      // Set theme to light after successful authentication
      setTheme('light')
      // Redirect to dashboard or intended URL
      const callbackUrl = searchParams.get('callbackUrl') || '/dashboard'
      router.push(callbackUrl)
    } else if (status === 'unauthenticated') {
      // If not authenticated, redirect to sign in
      signIn()
    }
  }, [status, router, searchParams, setTheme])

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-muted-foreground">Completing sign in...</p>
      </div>
    </div>
  )
}
