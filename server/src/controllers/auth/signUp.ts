import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { ACCESS_TOKEN } from '@/utils'

export const signUp = (fastify: FastifyInstance) => {
  return async (
    request: FastifyRequest<{ Body: { login: string; password: string } }>,
    reply: FastifyReply,
  ) => {
    try {
      const { login, password } = request.body

      if (!login || !password) {
        throw new Error('Неверный логин или пароль!')
      }

      const hash = await fastify.password.getHash(password),
        user = await fastify.user.getUserByLogin(login)

      if (user) {
        throw new Error('Пользователь уже существует')
      }

      const { id } = await fastify.user.createUser(login, hash)

      const accessToken = fastify.jwt.sign({ id }, { expiresIn: '1h' }),
        refreshToken = fastify.jwt.sign({ id }, { expiresIn: '7d' })

      const { token } = await fastify.refreshToken.createRefreshToken(
        id,
        refreshToken,
      )

      reply
        .setCookie(ACCESS_TOKEN, accessToken, {
          secure: true,
          httpOnly: true,
        })
        .status(201)
        .send({ data: { refreshToken: token } })
    } catch (e) {
      if (e instanceof Error) {
        reply.status(400).send({ messages: e.message })
      }
    }
  }
}
