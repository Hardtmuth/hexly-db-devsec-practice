import { Pool } from 'pg'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { config } from 'dotenv'

const __dirname = dirname(fileURLToPath(import.meta.url))
config({ path: join(__dirname, '../.env') })

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  database: process.env.POSTGRES_DB,
})

const createUser = async (name, login, email, password) => {
  try {
    const res = await pool.query(
      'SELECT * FROM create_user($1, $2, $3, $4);',
      [name, login, email, password]
    )
    console.log('Данные из таблицы users:', res.rows)
  } catch (err) {
    console.error('❌ Ошибка выполнения запроса:', err.stack)
  }
};

const getUsers = async () => {
  try {
    const tableName = 'securelog.users';
    const res = await pool.query(`SELECT * FROM ${tableName}`)
    console.log('Данные из таблицы users:', res.rows)
    return res.rows
  }
  catch (err) {
    console.error('❌ Ошибка подключения:', err.stack)
  }
}

const getUserById = async (userId) => {
  try {
    const res = await pool.query(
      'SELECT * FROM get_user_by_id($1)',
      [userId]
    )
    console.log('Данные из таблицы users:', res.rows)
    return res.rows
  } catch (err) {
    console.error('❌ Ошибка выполнения запроса:', err.stack)
  }
}

export { createUser, getUsers, getUserById }
