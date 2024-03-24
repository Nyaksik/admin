import { FastifyPluginAsync } from 'fastify'
import { UserBodySchema } from '../../schemas'
import { refresh, signIn, signUp } from '../../controllers'

const auth: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.post(
    '/sign-in',
    {
      schema: {
        body: UserBodySchema,
      },
    },
    signIn(fastify),
  )

  fastify.post(
    '/sign-up',
    {
      schema: {
        body: UserBodySchema,
      },
    },
    signUp(fastify),
  )

  fastify.post<{ Body: { refreshToken: string } }>('/refresh', refresh(fastify))
}

export default auth
