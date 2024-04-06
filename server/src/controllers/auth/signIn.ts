import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import {
  ACCESS_TOKEN,
  ACCESS_TOKEN_EXPIRE_IN,
  REFRESH_TOKEN_EXPIRE_IN,
} from '@/utils'

export const signIn = (fastify: FastifyInstance) => {
  return async (
    request: FastifyRequest<{ Body: { login: string; password: string } }>,
    reply: FastifyReply,
  ) => {
    try {
      const { login, password } = request.body

      if (!login || !password) {
        throw new Error('Неверный логин или пароль!')
      }

      const user = await fastify.user.getUserByLogin(login)

      if (!user) {
        throw new Error('Пользователь с таким логином не найден!')
      }

      const {
        refreshToken: userRefreshToken,
        id,
        password: userPassword,
      } = user

      if (!(await fastify.password.compareHash(password, userPassword))) {
        throw new Error('Неверный пароль!')
      }

      if (userRefreshToken) {
        await fastify.refreshToken.deleteRefreshToken(userRefreshToken.id)
      }

      const accessToken = fastify.jwt.sign(
          { id },
          { expiresIn: ACCESS_TOKEN_EXPIRE_IN },
        ),
        refreshToken = fastify.jwt.sign(
          { id },
          { expiresIn: REFRESH_TOKEN_EXPIRE_IN },
        )

      const { token } = await fastify.refreshToken.createRefreshToken(
        id,
        refreshToken,
      )

      reply
        .setCookie(ACCESS_TOKEN, accessToken, {
          secure: true,
          httpOnly: true,
        })
        .status(200)
        .send({ refreshToken: token, userId: id })
    } catch (e) {
      console.log(e)

      if (e instanceof Error) {
        reply.status(400).send({ messages: [e.message] })
      }
    }
  }
}
