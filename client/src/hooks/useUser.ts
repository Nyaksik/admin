import { PATHS, REFRESH_TOKEN } from '@/constant'
import { useNavigate } from 'react-router-dom'
import { UserSignIn } from '@/types'
import { LocalStorageService } from '@/services'

export function useUser() {
  const navigate = useNavigate()

  function login(data: UserSignIn) {
    LocalStorageService.setItem(REFRESH_TOKEN, data.refreshToken)
    navigate(PATHS.home)
  }

  function logout() {
    LocalStorageService.removeItem(REFRESH_TOKEN)
    navigate(PATHS.signIn)
  }

  return { login, logout }
}
