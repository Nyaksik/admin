import fp from 'fastify-plugin'
import { RefreshToken } from '../services'

export default fp(async (fastify) => {
  fastify.decorate('refreshToken', new RefreshToken(fastify))
})
