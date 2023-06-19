import * as React from 'react'
import { LayoutProps } from '../../models'
import Link from 'next/link'
import { Auth } from '../common'
import { useAuth } from '../../hooks'
import { useRouter } from 'next/router'

export function AdminLayout({ children }: LayoutProps) {
  const { logout, profile } = useAuth()

  async function handleLogoutClick() {
    try {
      await logout()
    } catch (error) {
      console.log('Failed to logout: ', error)
    }
  }
  return (
    <Auth>
      <h1>Admin Layout</h1>
      <div>Sidebar</div>

      <p>Hello: {profile?.username}</p>

      <button onClick={handleLogoutClick}>Logout</button>

      <Link href={'/'}>Home</Link>

      <Link href={'/about'}></Link>

      <div>{children}</div>
    </Auth>
  )
}
