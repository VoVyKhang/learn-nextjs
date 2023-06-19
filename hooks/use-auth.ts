import useSWR from 'swr'
import { PublicConfiguration } from 'swr/_internal'
import { authApi } from '../api-client'

export function useAuth(options?: Partial<PublicConfiguration>) {
  const {
    data: profile,
    error,
    mutate,
  } = useSWR('./profile', {
    dedupingInterval: 3600,
    revalidateOnFocus: false,
    ...options,
  })

  const firstLoading = profile === undefined && error === undefined

  async function login() {
    await authApi.login({
      username: 'Hoshi',
      password: '123456',
    })

    await mutate()
    // Ex: If after login then get profile and redirect to another page,
    // if not await after login it will redirect and get progile still not done
  }

  async function logout() {
    await authApi.logout()

    mutate({}, false)
  }

  return {
    profile,
    error,
    login,
    logout,
    firstLoading,
  }
}
