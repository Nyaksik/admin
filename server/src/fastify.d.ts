import { PrismaClient } from '@prisma/client'
import { Password, Records, RefreshToken, User } from './services'

declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient
    user: User
    refreshToken: RefreshToken
    password: Password
    records: Records
    someSupport(): string
  }
}
