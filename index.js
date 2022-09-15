require("dotenv").config();

const fs = require("fs");

const { get, convertToPostgres } = require("./src/services/sqlite.service");
const { insert } = require("./src/services/postgres.service");
const config = require("./src/config/config");

const postModel = require("./database/Models/Posts");

/**
 *  Function that start all convertion
 *
 * @param {String} table - Table name in Sqlite database
 * @param {Object} model - Model object with table typs (check docs)
 */
async function main(table, model) {
  if (!table) {
    throw new Error("Table not found");
  }

  let sql = "";

  const data = await get(table);
  data.forEach((post) => {
    const returnSql = convertToPostgres(post, model, table);
    sql = `${sql} ${returnSql}`;
  });

  if (config.sql_to_file) {
    fs.writeFileSync(`${table}.sql`, sql);
  }

  if (!config.dont_insert) {
    await insert(sql);
  }

  console.info(`Table ${table} done.`);
}

main("posts", postModel);
