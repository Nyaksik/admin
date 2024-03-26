import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { ACCESS_TOKEN } from '@/utils'

export const logout = (fastify: FastifyInstance) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const accessToken = request.cookies[ACCESS_TOKEN],
        { id }: { id: number } = fastify.jwt.verify(accessToken || ''),
        user = await fastify.user.getUserById(id)

      if (!user) {
        throw new Error('Пользователь с таким id не найден!')
      }

      if (user.refreshToken) {
        await fastify.refreshToken.deleteRefreshToken(user.refreshToken.id)
      }

      reply.clearCookie(ACCESS_TOKEN).status(200)
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
