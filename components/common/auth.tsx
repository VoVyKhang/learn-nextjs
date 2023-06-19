import React, { ReactNode, useEffect } from 'react'
import { useAuth } from '../../hooks'
import { useRouter } from 'next/router'
import { error } from 'console'

export function Auth({ children }: { children: any }) {
  const { profile, firstLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!firstLoading && !profile?.username) {
      router.push('/login')
    }
  }, [firstLoading, profile, router])

  if (!profile?.username) {
    return <p>Loading...</p>
  }

  return <div>{children}</div>
}
