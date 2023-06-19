import * as React from 'react'
import { authApi } from '../api-client'
import { useAuth } from '../hooks'
import { useRouter } from 'next/router'

export default function LoginPage() {
  const { login, logout, profile } = useAuth({
    revalidateOnMount: false,
  })

  const router = useRouter()

  async function handleLoginClick() {
    try {
      await login()
      router.push('/about')
    } catch (error) {
      console.log('Failed to login: ', error)
    }
  }

  async function handleGetProfileClick() {
    try {
      await authApi.getProfile()
    } catch (error) {
      console.log('Failed to get profile: ', error)
    }
  }

  async function handleLogoutClick() {
    try {
      await logout()
    } catch (error) {
      console.log('Failed to logout: ', error)
    }
  }

  return (
    <div>
      <h1>Login Page</h1>

      <p>Profile: {profile?.username || ''}</p>

      <button onClick={handleLoginClick}>Login</button>
      <button onClick={handleGetProfileClick}>Get Profile</button>
      <button onClick={() => router.push('/about')}>Go to About</button>
      <button onClick={handleLogoutClick}>Logout</button>
    </div>
  )
}
