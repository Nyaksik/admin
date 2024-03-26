import { FastifyPluginAsync } from 'fastify'
import {
  createRecords,
  deleteRecords,
  getRecords,
  getRecordsById,
  updateRecords,
} from '@/controllers'
import { RecordsBodySchema, RecordsQuerySchema } from '@/schemas'
import { jwtVerify, userVerify } from '@/utils'

const records: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.addHook('preHandler', jwtVerify)
  fastify.addHook('onRequest', userVerify(fastify))

  fastify.get(
    '/records',
    {
      schema: {
        querystring: RecordsQuerySchema,
      },
    },
    getRecords(fastify),
  )

  fastify.get('/records/:id', getRecordsById(fastify))

  fastify.post(
    '/records',
    {
      schema: {
        body: RecordsBodySchema,
      },
    },
    createRecords(fastify),
  )

  fastify.patch(
    '/records/:id',
    {
      schema: {
        body: RecordsBodySchema,
      },
    },
    updateRecords(fastify),
  )

  fastify.delete('/records/:id', deleteRecords(fastify))
}

export default records
