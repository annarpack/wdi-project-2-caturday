const pgp = require('pg-promise')();

const connectionSettings = {
  host: 'localhost',
  port: 5432,
  database: 'caturday_db',
  user: 'annarpack'
}

const db = pgp(connectionSettings);
module.exports = db;
