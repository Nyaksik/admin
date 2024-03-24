import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { ACCESS_TOKEN } from '../../utils'

export const refresh = (fastify: FastifyInstance) => {
  return async (
    request: FastifyRequest<{ Body: { refreshToken: string } }>,
    reply: FastifyReply,
  ) => {
    try {
      const { refreshToken: bodyRefreshToken } = request.body,
        dateNow = new Date().getTime(),
        { id, exp }: { id: number; exp: number } =
          fastify.jwt.verify(bodyRefreshToken),
        expDate = new Date(exp * 1000).getTime(),
        user = await fastify.user.getUserById(id)

      if (!user) {
        throw new Error('Пользователь с таким id не найден!')
      }

      if (dateNow > expDate) {
        const diffDate = Math.ceil((dateNow - expDate) / (1000 * 60 * 60 * 24))

        if (user.refreshToken && diffDate > 1) {
          await fastify.refreshToken.deleteRefreshToken(user.refreshToken.id)

          throw new Error('Рефреш токен просрочен')
        }
      }

      if (user.refreshToken) {
        await fastify.refreshToken.deleteRefreshToken(user.refreshToken.id)
      }

      const accessToken = fastify.jwt.sign(
          { id: user.id },
          { expiresIn: '1h' },
        ),
        refreshToken = fastify.jwt.sign({ id: user.id }, { expiresIn: '7d' })

      const { token } = await fastify.refreshToken.createRefreshToken(
        user.id,
        refreshToken,
      )

      reply
        .setCookie(ACCESS_TOKEN, accessToken, {
          secure: true,
          httpOnly: true,
        })
        .status(201)
        .send({ data: { refreshToken: token } })
    } catch (error) {
      if (error instanceof Error) {
        reply.status(400).send({
          error: [error.message],
        })
      }
    }
  }
}
