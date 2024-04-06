import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'

export const getRecordsById = (fastify: FastifyInstance) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { id } = request.query as { id: string }

      const records = await fastify.records.getRecordsById(parseInt(id))

      reply.status(200).send({ data: records })
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
