import { Navigate, Outlet } from 'react-router-dom'
import { REFRESH_TOKEN } from '@/constant'
import { LocalStorageService } from '@/services'

export function AuthPage() {
  if (LocalStorageService.getItem(REFRESH_TOKEN)) {
    return <Navigate to="/" />
  }

  return <Outlet />
}
