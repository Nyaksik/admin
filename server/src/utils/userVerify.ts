import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { ACCESS_TOKEN } from './constant'

export const userVerify = (fastify: FastifyInstance) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const accessToken = request.cookies[ACCESS_TOKEN],
        jwt: { id: number } | null = fastify.jwt.decode(accessToken || '')

      if (!jwt) {
        throw new Error(`${ACCESS_TOKEN} не найден!`)
      }

      const user = await fastify.user.getUserById(jwt.id)

      if (!user) {
        throw new Error('Пользователь с таким id не найден!')
      }
    } catch (err) {
      if (err instanceof Error) {
        reply.status(401).send({ messages: [err.message] })
      }
    }
  }
}
