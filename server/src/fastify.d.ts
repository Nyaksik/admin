import { PrismaClient } from '@prisma/client'
import { User } from './controllers/user'

declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient
    user: User
  }
}
