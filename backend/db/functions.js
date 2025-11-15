import { Client } from 'pg'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { config } from 'dotenv'

const __dirname = dirname(fileURLToPath(import.meta.url))
config({ path: join(__dirname, '../.env') })

// console.log('POSTGRES_USER: ', process.env.POSTGRES_USER)

const client = new Client({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  database: process.env.POSTGRES_DB,
})

// Функция для тестирования подключения
const testConnection = async () => {
  try {
    await client.connect()
    console.log('✅ Подключение к БД успешно!')

    // Пример запроса
    const res = await client.query(`SELECT * FROM ${process.env.POSTGRES_DB}.users LIMIT 3`)
    console.log('Данные из таблицы users:', res.rows)

    await client.end()
  }
  catch (err) {
    console.error('❌ Ошибка подключения:', err.stack)
  }
}

testConnection()
