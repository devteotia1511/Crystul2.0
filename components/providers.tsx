"use client"

import { SessionProvider, useSession } from 'next-auth/react'
import { ThemeProvider, useTheme as useNextTheme } from '@/components/theme-provider'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

function ThemeController({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const { setTheme } = useNextTheme()
  const router = useRouter()

  useEffect(() => {
    if (status === 'authenticated') {
      setTheme('light')
    } else if (status === 'unauthenticated') {
      setTheme('dark')
    }
  }, [status, setTheme])

  return <>{children}</>
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
    console.log('Providers mounted, environment check:', {
      nodeEnv: process.env.NODE_ENV,
      hasNextAuthUrl: !!process.env.NEXTAUTH_URL,
      hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET
    })
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <SessionProvider 
      refetchInterval={0} 
      refetchOnWindowFocus={false}
    >
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem={false}
        disableTransitionOnChange
        enableColorScheme={true}
      >
        <ThemeController>
          {children}
        </ThemeController>
      </ThemeProvider>
    </SessionProvider>
  )
}