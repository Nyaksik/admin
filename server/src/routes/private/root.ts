import { FastifyPluginAsync } from 'fastify'
import { jwtVerify } from '../../utils'

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.addHook('preHandler', jwtVerify)

  fastify.get('/', async function (request, reply) {
    return { root: true }
  })
}

export default root
