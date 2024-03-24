import fp from 'fastify-plugin'
import { User } from '../services'

export default fp(async (fastify) => {
  fastify.decorate('user', new User(fastify))
})
