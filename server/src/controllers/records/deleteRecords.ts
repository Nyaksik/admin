import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'

export const deleteRecords = (fastify: FastifyInstance) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { id } = request.query as { id: string }

      await fastify.records.deleteRecords(parseInt(id))

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
