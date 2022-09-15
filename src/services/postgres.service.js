const { Client } = require("pg");
const config = require("../config/config");

/**
 * Connect on postgres database
 *
 * @returns {Client}
 */
async function connection() {
  const { postgres } = config;

  const client = new Client({
    ssl: postgres.enableSsl ? postgres.sslConfig : false,
  });

  await client.connect();
  return client;
}

/**
 *
 * @param {String} sql - Insert query
 */
async function insert(sql) {
  const conn = await connection();

  const res = await conn.query(sql);
  console.info(res);
  await conn.end();
}

module.exports = { insert };
