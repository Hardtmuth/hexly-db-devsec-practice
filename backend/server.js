import Fastify from 'fastify'
// import bcrypt from 'bcrypt'
import { create_user } from './db/functions.js'

const fastify = Fastify({
  logger: true,
})

// Declare a route
fastify.get('/', async (request, reply) => {
  return { hello: 'world' }
})

fastify.post('/api/register', async (req, reply) => {
  const { name, login, email, password } = req.body
  // const passwordHash = await bcrypt.hash(password, 10)
  await create_user(name, login, email, password)
  reply.send({ message: 'User registered successfully' })
})

// Run the server!
try {
  await fastify.listen({ port: 3000 })
}
catch (err) {
  fastify.log.error(err)
  process.exit(1)
}
