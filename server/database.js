const Pool = require('pg').Pool
require('dotenv').config()

const pool = new Pool({
  user: 'postgres',
  password: '1029neatza',
  host: 'localhost',
  port: 5432,
  database: 'weeklyplanner'
})

module.exports = pool