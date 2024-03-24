import { FastifyPluginAsync } from 'fastify'
import { logoutController } from '../../controllers'
import { jwtVerify } from '../../utils'

const logout: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.addHook('preHandler', jwtVerify)

  fastify.post('/logout', logoutController(fastify))
}

export default logout
