import { lazy } from 'react'

export const LazyHome = lazy(() => import('./Home.tsx'))
export const LazySignIn = lazy(() => import('./SignIn.tsx'))
export const LazySignUp = lazy(() => import('./SignUp.tsx'))
export const LazyError = lazy(() => import('./Error.tsx'))
