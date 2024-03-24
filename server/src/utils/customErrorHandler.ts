import { errorCodes, FastifyError, FastifyReply, FastifyRequest } from 'fastify'
import { ZodError } from 'zod'

interface ZodFastifyError extends FastifyError {
  errors?: ZodError[]
}

/**
 * Custom error handling Zod
 */
export function customErrorHandler(
  error: ZodFastifyError,
  request: FastifyRequest,
  reply: FastifyReply,
) {
  if (error.code === errorCodes.FST_ERR_VALIDATION().code && error.errors) {
    return reply.status(400).send({
      message: error.errors.map((e) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const { message, path } = e

        return `${path.join('')}: ${message}`
      }),
    })
  }

  reply.status(500).send(error)
}
