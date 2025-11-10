import { exec } from 'child_process'
import path from 'path'

export default async (fastify) => {
  fastify.post('/api.backup/', (req, reply) => {
    const backupFile = path.join('/backups', `backup-${Date.now()}.sql`)

    exec(`pg_dump -U user dbname > ${backupFile}`, (err, stdout, stderr) => {
      if (err) {
        return reply.status(500).send({ message: 'Backup failed', error: stderr })
      }
      reply.send({ message: 'Backup created successfully', file: backupFile })
    })
  })
}
