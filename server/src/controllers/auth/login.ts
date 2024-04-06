import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { ACCESS_TOKEN, ACCESS_TOKEN_EXPIRE_IN } from '@/utils'

export const login = (fastify: FastifyInstance) => {
  return async (
    request: FastifyRequest<{ Body: { refreshToken: string } }>,
    reply: FastifyReply,
  ) => {
    try {
      const { refreshToken } = request.body

      if (!refreshToken) {
        throw new Error('Нет токена!')
      }

      const { id }: { id: number } = fastify.jwt.verify(refreshToken || ''),
        user = await fastify.user.getUserById(id)

      if (!user) {
        throw new Error('Пользователь с таким id не найден!')
      }

      const accessToken = fastify.jwt.sign(
        { id },
        { expiresIn: ACCESS_TOKEN_EXPIRE_IN },
      )

      reply
        .setCookie(ACCESS_TOKEN, accessToken, {
          secure: true,
          httpOnly: true,
        })
        .status(200)
        .send({ userId: id })
    } catch (error) {
      if (error instanceof Error) {
        reply.status(401).send({
          messages: [error.message],
        })
      }
    }
  }
}
