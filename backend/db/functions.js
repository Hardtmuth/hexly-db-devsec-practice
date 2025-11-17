import { Client, Pool } from 'pg'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { config } from 'dotenv'

const __dirname = dirname(fileURLToPath(import.meta.url))
config({ path: join(__dirname, '../.env') })

const client = new Client({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  database: process.env.POSTGRES_DB,
})

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  database: process.env.POSTGRES_DB,
})

const create_user = async (name, login, email, password) => {
  try {
    await pool.query(
      'SELECT * FROM create_user($1, $2, $3, $4);',
      [name, login, email, password],
    )
  }
  catch (err) {
    console.error('❌ Ошибка подключения:', err.stack)
  }
}

const testConnection = async () => {
  try {
    await client.connect()
    console.log('✅ Подключение к БД успешно!')

    const res = await client.query(`SELECT * FROM ${process.env.POSTGRES_DB}.users LIMIT 3`)
    console.log('Данные из таблицы users:', res.rows)

    await client.end()
  }
  catch (err) {
    console.error('❌ Ошибка подключения:', err.stack)
  }
}

// testConnection()
create_user('Андрей', 'Hardmuth', 'asd@asd.com', 'secretPassword')
export { create_user }
