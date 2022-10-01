import { runQuery } from "../../mongoDB/DB.js";

export const insert = (data) => {
  const query = "INSERT INTO cards_db.chat(msg,player_id,session_id) values (?,?,?)";
  return runQuery(query, [data.msg, data.userId, data.sessionId]);
};
export const getChatBySessionId = (sessionId) => {
  const query =
    "select * from cards_db.chat left join cards_db.user on cards_db.chat.player_id = cards_db.user.id where session_id = ?";
  return runQuery(query, [sessionId]);
};
