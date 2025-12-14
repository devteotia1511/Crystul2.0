"use client"

import { SessionProvider, useSession } from 'next-auth/react'
import { ThemeProvider, useTheme as useNextTheme } from '@/components/theme-provider'
import { useEffect, useState } from 'react'
import { validateEnvironmentVariablesOnStartup } from '@/lib/env-validation'
import { useRouter } from 'next/navigation'

function ThemeController({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const { setTheme } = useNextTheme()
  const router = useRouter()

  useEffect(() => {
    if (status === 'authenticated') {
      setTheme('light')
      // Force a re-render to ensure theme is applied
      router.refresh()
    } else if (status === 'unauthenticated') {
      setTheme('dark')
    }
  }, [status, setTheme, router])

  return <>{children}</>
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
    if (typeof window !== 'undefined') {
      validateEnvironmentVariablesOnStartup()
    }
  }, [])

  if (!mounted) {
    return (
      <SessionProvider>
        <div className="min-h-screen bg-background" />
      </SessionProvider>
    )
  }

  return (
    <SessionProvider 
      refetchInterval={0} 
      refetchOnWindowFocus={true}
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