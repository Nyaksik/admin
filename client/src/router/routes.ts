import { LazyHome, LazySignIn, LazySignUp } from '@/views'

export const routes = [
  {
    path: '/',
    Component: LazyHome,
  },
  {
    path: '/sign-in',
    Component: LazySignIn,
  },
  {
    path: '/sign-up',
    Component: LazySignUp,
  },
]
