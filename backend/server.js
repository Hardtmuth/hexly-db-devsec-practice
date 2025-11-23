import Fastify from 'fastify'
import { getUsers, getUserById } from './db/functions.js'
import createUserRoute from './routes/createUser.js'
import searchUserByPattern from './routes/searchUserByPattern.js'
import resentLogs from './routes/resentLogs.js'

const fastify = Fastify({
  logger: true,
})

fastify.get('/', async (request, reply) => {
  return { hello: 'world' }
})

fastify.get('/api/users', async (request, reply) => {
  const res = await getUsers()
  reply.send(res)
})

fastify.get('/api/user/:id', async (request, reply) => {
  const userId = request.params.id
  console.log('ID пользователя:', userId)
  const res = await getUserById(userId)
  reply.send(res)
})

await fastify.register(createUserRoute)
await fastify.register(searchUserByPattern)
await fastify.register(resentLogs)

try {
  await fastify.listen({ port: 3000 })
}
catch (err) {
  fastify.log.error(err)
  process.exit(1)
}
