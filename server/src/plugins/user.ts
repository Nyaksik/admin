import fp from 'fastify-plugin'
import { User } from '../controllers/user'

export default fp(async (fastify) => {
  fastify.decorate('user', new User(fastify))
})
