const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const path = require("path");

const { sqlite } = require("../config/config");

const normalizeString = require("../utils/normalizeString");
const dateParse = require("../utils/dateParse");
const typeCheck = require("../utils/typeCheck");
const types = require("../utils/types");

async function connection() {
  const db_path = path.resolve(__dirname, sqlite.database_path);

  return open({
    filename: db_path,
    driver: sqlite3.Database,
  });
}

/**
 * Get all table data
 *
 * @param {String} table - Table name
 * @returns All table data
 */
async function get(table) {
  const conn = await connection();

  return await conn.all(`SELECT * FROM ${table};`);
}

/**
 * Get object returned from sqlite select query
 * and convert it to postgres insert query.
 *
 * @param {Object} data - Object result from Sqlite select query
 * @param {Object} model - Model object with table typs (check docs)
 * @param {string} tableName - Table name in Sqlite database
 * @returns {string} - SQL insert query
 */
function convertToPostgres(data = {}, model, tableName) {
  if (!data) {
    throw new Error("Data not found");
  }

  if (!tableName) {
    throw new Error("Table not found");
  }

  delete data.id;
  delete data._id;
  delete data.uuid;

  typeCheck(model, tableName);

  const fields = Object.keys(data);
  let sql = `insert into ${tableName}(`;

  fields.forEach((field, index) => {
    sql += `"${field}"`;

    if (index < fields.length - 1) {
      sql += ", ";
    }
  });

  sql += ") VALUES (";

  const { stringTypes, numberTypes } = types;

  fields.forEach((field, index) => {
    if (stringTypes.includes(model[field])) {
      if (!data[field] || data[field] === "null") {
        sql += `null`;
      } else {
        if (model[field] === "datetime") {
          sql += `'${dateParse(data[field])}'`;
        } else {
          sql += `'${normalizeString(data[field])}'`;
        }
      }
    } else if (numberTypes.includes(model[field])) {
      sql += `${data[field] || null}`;
    }

    if (index < fields.length - 1) {
      sql += ", ";
    }
  });

  sql += ");";

  return sql;
}

module.exports = { get, convertToPostgres };
