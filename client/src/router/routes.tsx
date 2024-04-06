import { LazyError, LazyHome, LazySignIn, LazySignUp } from '@/views'
import { AuthPage, ProtectedPage } from '@/components'
import { API } from '@/api'
import { LocalStorageService } from '@/services'
import { REFRESH_TOKEN } from '@/constant'

export const routes = [
  {
    path: '/',
    element: <ProtectedPage />,
    loader: () =>
      API.auth.login.post({
        refreshToken: LocalStorageService.getItem(REFRESH_TOKEN),
      }),
    errorElement: <LazyError />,
    children: [
      {
        path: '/',
        element: <LazyHome />,
      },
    ],
  },
  {
    path: '/auth',
    element: <AuthPage />,
    errorElement: <LazyError />,
    children: [
      {
        path: 'sign-in',
        element: <LazySignIn />,
      },
      {
        path: 'sign-up',
        element: <LazySignUp />,
      },
    ],
  },
]
