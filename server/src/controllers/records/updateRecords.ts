import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { IRecords } from '@/types'

export const updateRecords = (fastify: FastifyInstance) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { id } = request.query as { id: string }

      const body = request.body as IRecords

      body.cash = parseInt(String(body.cash), 10)
      body.completed = Boolean(body.completed)

      await fastify.records.updateRecords(parseInt(id), body)

      reply.status(200)
    } catch (error) {
      if (error instanceof Error) {
        reply.send({
          status: 400,
          messages: [error.message],
        })
      }
    }
  }
}
