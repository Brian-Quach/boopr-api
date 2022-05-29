const knex = require("knex");
const bookshelf = require("bookshelf");
const sql = require("sql-template-strings");
const config = {
  client: "pg",
  pool: { min: 1, max: 100 },
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
};

const db = bookshelf(knex(config));

const query = async ({ query, options = {}, transaction }) => {
  let result;

  if (transaction) {
    result = await db.knex
      .raw(query.query, query.values)
      .transacting(transaction);
  } else {
    result = await db.knex.raw(query.query, query.values);
  }

  if (options.first && result.rows.length > 1) {
    throw Error(`Expected 1 row, found ${result.rows.length}.`);
  }

  if (options.first) result = result.rows[0];
  if (!options.first) result = result.rows;

  return result;
};

const transaction = (callback) => {
  return db.transaction(callback);
};

module.exports = { query, transaction, sql };
