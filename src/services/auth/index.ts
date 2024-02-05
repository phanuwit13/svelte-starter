import { authStore } from '@/stores/auth'
import { apiClient } from '@/utils/api'
import type { AuthResponse, FormRequestLogin, UserResponse } from './auth.types'

const loginService = ({
  data,
}: {
  data: FormRequestLogin
}): Promise<AuthResponse> =>
  apiClient.post('/auth/login', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

const userService = (): Promise<UserResponse> => {
  let token = ''
  authStore.subscribe((value) => {
    token = value.token
  })()

  return apiClient.get('/auth/me', {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${
        token ?? (window.localStorage.getItem('sv_tk') || '')
      }`,
    },
  })
}

export { loginService, userService }

