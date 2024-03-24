import { PrismaClient, RefreshToken, User as schema } from '@prisma/client'
import { FastifyInstance } from 'fastify'

interface UserSchema extends schema {
  refreshToken?: RefreshToken
}

export class User {
  private _prisma: PrismaClient
  constructor({ prisma }: FastifyInstance) {
    this._prisma = prisma
  }

  async createUser(
    login: string,
    password: string,
  ): Promise<Pick<schema, 'id'>> {
    return await this._prisma.user.create({
      data: {
        login,
        password,
      },
      select: {
        id: true,
      },
    })
  }

  async getUserById(id: number): Promise<UserSchema | null> {
    return (await this._prisma.user.findUnique({
      where: { id },
      include: { refreshToken: true },
    })) as UserSchema | null
  }

  async getUserByLogin(login: string): Promise<UserSchema | null> {
    return (await this._prisma.user.findUnique({
      where: { login },
      include: { refreshToken: true },
    })) as UserSchema | null
  }

  async updateUser(id: number, data: Partial<schema>): Promise<void> {
    await this._prisma.user.update({
      where: { id },
      data,
    })
  }
}
