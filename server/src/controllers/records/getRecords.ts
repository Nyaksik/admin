import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { IRecordsQuery } from '@/types'

export const getRecords = (fastify: FastifyInstance) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const query = request.query as IRecordsQuery,
        { id } = request.user as { id: number }

      const [count, records] = await fastify.records.getRecords(id, query)

      reply.status(200).send({
        pagination: {
          total: count,
        },
        records,
      })
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
