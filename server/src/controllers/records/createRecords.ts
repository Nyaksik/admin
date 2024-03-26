import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { IRecords } from '@/types'

export const createRecords = (fastify: FastifyInstance) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { id } = request.user as { id: number }

      const body = request.body as IRecords

      body.cash = parseInt(String(body.cash), 10)
      body.completed = Boolean(body.completed)

      await fastify.records.createRecords(id, body)

      reply.status(200)
    } catch (error) {
      if (error instanceof Error) {
        reply.send({
          status: 400,
          message: [error.message],
        })
      }
    }
  }
}
