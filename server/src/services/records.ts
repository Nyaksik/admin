import { PrismaClient, Record as schema } from '@prisma/client'
import { FastifyInstance } from 'fastify'
import { IRecords, IRecordsQuery } from '@/types'

export class Records {
  private _prisma: PrismaClient

  constructor({ prisma }: FastifyInstance) {
    this._prisma = prisma
  }

  async getRecords(
    id: number,
    orderBy: IRecordsQuery,
  ): Promise<[number, schema[]]> {
    return await Promise.all([
      this._getCount(id, orderBy),
      this._getRecords(id, orderBy),
    ])
  }

  async getRecordsById(id: number): Promise<schema | null> {
    return await this._prisma.record.findUnique({
      where: { id },
    })
  }

  async createRecords(userId: number, data: IRecords): Promise<void> {
    await this._prisma.record.create({
      data: {
        userId,
        ...data,
      },
    })
  }

  async updateRecords(id: number, data: Partial<schema>): Promise<void> {
    await this._prisma.record.update({
      where: { id },
      data,
    })
  }

  async deleteRecords(id: number): Promise<void> {
    await this._prisma.record.delete({ where: { id } })
  }

  _getCount(id: number, orderBy: IRecordsQuery): Promise<number> {
    const { completed = undefined, take, skip } = orderBy

    return this._prisma.record.count({
      skip: parseInt(skip),
      take: parseInt(take),
      where: {
        userId: id,
        completed: this._getCompleted(completed),
      },
    })
  }

  _getRecords(id: number, orderBy: IRecordsQuery): Promise<schema[]> {
    const { completed = undefined, take, skip, ...query } = orderBy

    return this._prisma.record.findMany({
      skip: parseInt(skip),
      take: parseInt(take),
      where: {
        userId: id,
        completed: this._getCompleted(completed),
      },
      orderBy: query,
    })
  }

  _getCompleted(completed: string | undefined): boolean | undefined {
    let newCompleted = undefined

    if (completed) {
      newCompleted = Boolean(parseInt(completed))
    }

    return newCompleted
  }
}
