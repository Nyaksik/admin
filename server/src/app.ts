import { join } from 'path'
import AutoLoad, { AutoloadPluginOptions } from '@fastify/autoload'
import { FastifyPluginAsync, FastifyServerOptions } from 'fastify'
import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'
import fastifyMultipart from '@fastify/multipart'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import { ACCESS_TOKEN, customErrorHandler } from './utils'

export interface AppOptions
  extends FastifyServerOptions,
    Partial<AutoloadPluginOptions> {}

const options: AppOptions = {}

const app: FastifyPluginAsync<AppOptions> = async (
  fastify,
  opts,
): Promise<void> => {
  fastify.setValidatorCompiler(validatorCompiler)
  fastify.setSerializerCompiler(serializerCompiler)
  fastify.setErrorHandler(customErrorHandler)

  fastify.register(fastifySwagger, {
    transform: jsonSchemaTransform,
  })

  fastify.register(fastifySwaggerUi, { prefix: '/doc' })
  fastify.register(fastifyJwt, {
    secret: 'super-secret',
    cookie: {
      cookieName: ACCESS_TOKEN,
      signed: false,
    },
  })
  fastify.register(fastifyCookie)
  fastify.register(fastifyMultipart, { attachFieldsToBody: 'keyValues' })

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  void fastify.register(AutoLoad, {
    dir: join(__dirname, 'plugins'),
    options: opts,
  })

  // This loads all plugins defined in routes
  // define your routes in one of these
  void fastify.register(AutoLoad, {
    dir: join(__dirname, 'routes', 'public'),
    options: { prefix: '/api', ...opts },
  })

  void fastify.register(AutoLoad, {
    dir: join(__dirname, 'routes', 'private'),
    options: { prefix: '/api', ...opts },
  })
}

export default app

export { app, options }
