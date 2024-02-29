import { FastifyPluginAsync } from 'fastify'

const auth: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.post('/sign-in', async function (request, reply) {
    try {
      await fastify.user.createUser()
    } catch (e) {
      console.log(e)
    }

    // reply.send({ message: 'Hello World!' })
  })

  fastify.get<{ Querystring: { id: string } }>(
    '/user:id',
    async function (request, reply) {
      const { id } = request.query

      try {
        const a = await fastify.user.getUser(Number(id))

        reply.send({ message: a })
      } catch (e) {
        console.log(e)
      }
    }
  )
}

export default auth
