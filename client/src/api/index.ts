import { paths } from './paths.ts'
import { ApiBase } from './apiBase.ts'

export const API = {
  auth: {
    signIn: new ApiBase(paths.auth.signIn),
    signUp: new ApiBase(paths.auth.signUp),
    refresh: new ApiBase(paths.auth.refresh),
  },
}
