import { Navigate, Outlet, useLoaderData } from 'react-router-dom'
import { LocalStorageService } from '@/services'
import { REFRESH_TOKEN } from '@/constant'

export function ProtectedPage() {
  const loaderData = useLoaderData() as { data: { userId: number } }

  if (
    !(loaderData?.data?.userId && LocalStorageService.getItem(REFRESH_TOKEN))
  ) {
    return <Navigate to="/auth/sign-in" />
  }

  return <Outlet />
}
