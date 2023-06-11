const Pool = require("pg").Pool;

const pool = new Pool({
  user: "rhjgadwh",
  password: "Pm5FFDEvn6SFGGmvWWtZj0sNSBV377yl",
  host: "lallah.db.elephantsql.com",
  port: 5432,
  database: "rhjgadwh",
});

module.exports = pool;
