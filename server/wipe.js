const { Pool } = require('pg');
require('dotenv').config();
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
pool.query('DELETE FROM "Review";')
  .then(() => console.log('Wiped'))
  .catch(console.error)
  .finally(() => pool.end());
