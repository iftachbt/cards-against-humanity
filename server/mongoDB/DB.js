import mysql from "mysql";
import session from "express-session";
import mysqlSession from "express-mysql-session";

const options = {
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

export const runQuery = (query, values) => {
  return new Promise((resolve) => {
    const connection = mysql.createConnection(options);
    connection.connect(function (err) {
      if (err) console.log("err", err.code);
      connection.query(query, values, function (err, result) {
        if (err) console.log("err", err.code);
        resolve(err ? err.code : result);
      });
    });
  });
};

const MySQLStore = mysqlSession(session);

export const sessionStore = new MySQLStore(options);
