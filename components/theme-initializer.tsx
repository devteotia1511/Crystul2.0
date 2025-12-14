'use client'

import { useEffect } from 'react'
import { useTheme } from './theme-provider'
import { useSession } from 'next-auth/react'

export function ThemeInitializer() {
  const { data: session } = useSession()
  const { setTheme } = useTheme()

  useEffect(() => {
    if (session) {
      setTheme('light')
    } else {
      setTheme('dark')
    }
  }, [session, setTheme])

  return null
}
