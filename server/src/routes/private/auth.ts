import { FastifyPluginAsync } from 'fastify'
import { jwtVerify } from '@/utils'
import { login, logout } from '@/controllers'

const auth: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.addHook('preHandler', jwtVerify)

  fastify.post('/logout', logout(fastify))

  fastify.post<{ Body: { refreshToken: string } }>('/login', login(fastify))
}

export default auth
