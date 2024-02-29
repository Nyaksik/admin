import { PrismaClient } from '@prisma/client'
import { FastifyInstance } from 'fastify'

export class User {
  private _prisma: PrismaClient

  constructor({ prisma }: FastifyInstance) {
    this._prisma = prisma
  }

  async createUser() {
    return this._prisma.user.create({
      data: {
        login: '<NAME>',
        password: '123',
        refreshToken: '',
      },
    })
  }

  async getUser(id: number) {
    return await this._prisma.user.findUnique({ where: { id } })
  }
}
