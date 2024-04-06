import { FastifyReply, FastifyRequest } from 'fastify'

export async function jwtVerify(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify()
  } catch (err) {
    if (err instanceof Error) {
      reply.status(401).send({ messages: [err.message] })
    }
  }
}
