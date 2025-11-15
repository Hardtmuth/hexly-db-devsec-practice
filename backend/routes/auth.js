import bcrypt from 'bcrypt'
import { create_user } from '../db/functions.js'

export default async (fastify) => {
  fastify.post('/api/register', async (req, reply) => {
    const { name, email, password } = req.body
    const passwordHash = await bcrypt.hash(password, 10)

    await create_user(name, email, passwordHash)

    reply.send({ message: 'User registered successfully' })
  })
}
