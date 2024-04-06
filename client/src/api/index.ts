import { paths } from './paths.ts'
import { ApiBase } from './apiBase.ts'

export const API = {
  auth: {
    signIn: new ApiBase(paths.auth.signIn),
    signUp: new ApiBase(paths.auth.signUp),
    refresh: new ApiBase(paths.auth.refresh),
    login: new ApiBase(paths.auth.login),
    logout: new ApiBase(paths.auth.logout),
  },
}
