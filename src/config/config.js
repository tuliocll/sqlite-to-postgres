const fs = require("fs");

module.exports = {
  sqlite: {
    database_path: "../../database/data.db",
  },
  postgres: {
    enableSsl: process.env.PG_ENABLE_SSL,
    sslConfig: {
      rejectUnauthorized: true,
      ca: process.env.PG_ENABLE_CA
        ? fs.readFileSync(`${__dirname}/../../certs/certificate.crt`).toString()
        : null,
    },
  },
  sql_to_file: process.env.SQL_TO_FILE,
  dont_insert: process.env.DONT_INSERT,
};
