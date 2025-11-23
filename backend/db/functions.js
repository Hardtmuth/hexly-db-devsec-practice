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
    console.log('Новый пльзователь успешно создан: ', res.rows)
    return res.rows
  } catch (err) {
    console.error('❌ Ошибка при создании нового пользователя:', err.stack)
    return err.stack
  }
};

const getUsers = async () => {
  try {
    const tableName = 'users';
    const res = await pool.query(`SELECT * FROM ${tableName}`)
    console.log('Данные из таблицы users:', res.rows)
    return res.rows
  }
  catch (err) {
    console.error('❌ Ошибка получения даннх из таблицы users:', err.stack)
  }
}

const getUserById = async (userId) => {
  try {
    const res = await pool.query(
      'SELECT * FROM get_user_by_id($1)',
      [userId]
    )
    console.log(`Данные пользователя с ID ${userId}: `, res.rows)
    return res.rows
  } catch (err) {
    console.error(`❌ Ошибка получения данных пользователя с ID ${userId}:`, err.stack)
  }
}

const recentLogs = async (userId) => {
  try {
    const res = await pool.query(
      'SELECT * FROM recent_logs($1)',
      [userId]
    )
    console.log('Последние 5 записей в логах: ', res.rows)
    return res.rows
  }
  catch (err) {
    console.error('❌ Ошибка получения логов: ', err.stack)
  }
}

const searchUsersByPattern = async (name_pattern) => {
  try {
    const res = await pool.query(
      'SELECT * FROM search_users($1)',
      [name_pattern]
    )
    console.log('Данные пользователя: ', res.rows)
    return res.rows
  }
  catch (err) {
    console.error('❌ Ошибка получения данных пользователя: ', err.stack)
  }
}

export { createUser, getUsers, getUserById, searchUsersByPattern, recentLogs }
