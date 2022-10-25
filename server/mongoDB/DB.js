import mysql from "mysql";
import session from "express-session";
import mysqlSession from "express-mysql-session";
import { InternalServerError } from "../error_handling/error.class.js";

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

export const runQuery = (query, values, op) => {
  if (op?.log) console.log(query, values);
  return new Promise((resolve) => {
    const connection = mysql.createConnection(dbConfig);
    connection.connect(function (err) {
      if (err) throw new InternalServerError(err.code);
      connection.query(query, values, function (err, result) {
        let res = result;
        if (err) {
          if (op?.codeInstedOfError) res = err.code;
          else throw new InternalServerError(err.code);
          console.log("err", err.code);
        }
        resolve(res);
      });
    });
  });
};

const MySQLStore = mysqlSession(session);

export const sessionStore = new MySQLStore(dbConfig);
