import fp from 'fastify-plugin'
import { Records } from '../services'

export default fp(async (fastify) => {
  fastify.decorate('records', new Records(fastify))
})
