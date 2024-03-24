import fp from 'fastify-plugin'
import { Password } from '../services'

export default fp(async (fastify) => {
  fastify.decorate('password', new Password())
})
