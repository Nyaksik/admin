import { PrismaClient, RefreshToken as schema } from '@prisma/client'
import { FastifyInstance } from 'fastify'

export class RefreshToken {
  private _prisma: PrismaClient

  constructor({ prisma }: FastifyInstance) {
    this._prisma = prisma
  }

  async createRefreshToken(
    userId: number,
    token: string,
  ): Promise<Pick<schema, 'token'>> {
    return await this._prisma.refreshToken.create({
      data: {
        userId,
        token,
      },
      select: {
        token: true,
      },
    })
  }

  async deleteRefreshToken(id: number): Promise<void> {
    await this._prisma.refreshToken.delete({ where: { id } })
  }
}
