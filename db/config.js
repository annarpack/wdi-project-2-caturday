const pgp = require('pg-promise')();

const connectionSettings = {
  host: 'localhost',
  port: 5432,
  database: 'caturday',
  user: 'annarpack'
}

const db = pgp(connectionSettings);
module.exports = db;
