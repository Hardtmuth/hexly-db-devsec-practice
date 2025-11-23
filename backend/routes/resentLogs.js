import { recentLogs } from '../db/functions.js'

export default async (fastify) => {
  fastify.get('/api/userlogs/:id', async (req, reply) => {
    const { id } = req.params

    if (!id) {
      return reply.status(400).send({
        error: 'Параметр id обязателен'
      });
    }
    const res = await recentLogs(id)
    reply.send(res)
  })
}
