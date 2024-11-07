const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "diarybook",
  password: "0507",
  port: 5432,
});
module.exports = pool;
 