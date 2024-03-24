import { PrismaClient } from '@prisma/client'
import Password from './services/password'
import { RefreshToken, User } from './services'

declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient
    user: User
    refreshToken: RefreshToken
    password: Password
    someSupport(): string
  }
}
