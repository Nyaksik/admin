import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import {
  ACCESS_TOKEN,
  ACCESS_TOKEN_EXPIRE_IN,
  REFRESH_TOKEN_EXPIRE_IN,
} from '@/utils'

export const refresh = (fastify: FastifyInstance) => {
  return async (
    request: FastifyRequest<{ Body: { refreshToken: string } }>,
    reply: FastifyReply,
  ) => {
    try {
      const { refreshToken: bodyRefreshToken } = request.body,
        dateNow = new Date().getTime(),
        jwt: { id: number; exp: number } | null =
          fastify.jwt.decode(bodyRefreshToken)

      if (!jwt) {
        throw new Error('Неверный токен!')
      }

      const expDate = new Date(jwt.exp * 1000).getTime(),
        user = await fastify.user.getUserById(jwt.id)

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
          { expiresIn: ACCESS_TOKEN_EXPIRE_IN },
        ),
        refreshToken = fastify.jwt.sign(
          { id: user.id },
          { expiresIn: REFRESH_TOKEN_EXPIRE_IN },
        )

      const { token } = await fastify.refreshToken.createRefreshToken(
        user.id,
        refreshToken,
      )

      reply
        .setCookie(ACCESS_TOKEN, accessToken, {
          secure: true,
          httpOnly: true,
        })
        .status(200)
        .send({ refreshToken: token })
    } catch (error) {
      if (error instanceof Error) {
        reply
          .clearCookie(ACCESS_TOKEN)
          .status(401)
          .send({
            messages: [error.message],
          })
      }
    }
  }
}
