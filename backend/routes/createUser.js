import bcrypt from 'bcrypt'
import { createUser } from '../db/functions.js'

export default async (fastify) => {
  fastify.post('/api/register', async (req, reply) => {
    const { name, login, email, password } = req.body
    const passwordHash = await bcrypt.hash(password, 10)

    const res = await createUser(name, login, email, passwordHash)

    // reply.send({ message: 'User registered successfully' })
    reply.send(res)
  })
}
