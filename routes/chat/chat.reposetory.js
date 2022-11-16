import { runQuery } from "../../DB/DB.js";

export const insert = (data) => {
  const query = `INSERT INTO ${process.env.DB_NAME}.chat(msg,player_id,session_id,winner) values (?,?,?,?)`;
  return runQuery(query, [data.msg, data.userId, data.sessionId, data.winner]);
};
export const getChatBySessionId = (sessionId) => {
  const query = `select * from ${process.env.DB_NAME}.chat 
  left join ${process.env.DB_NAME}.user on ${process.env.DB_NAME}.chat.player_id = ${process.env.DB_NAME}.user.id 
  where session_id = ? 
  ORDER BY ts DESC`;
  return runQuery(query, [sessionId]);
};
