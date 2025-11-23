import { searchUsersByPattern } from '../db/functions.js'

export default async (fastify) => {
  fastify.get('/api/search', async (req, reply) => {
    const { pattern } = req.query

    if (!pattern) {
      return reply.status(400).send({
        error: 'Параметр pattern обязателен'
      });
    }
    const res = await searchUsersByPattern(pattern)
    reply.send(res)
  })
}
