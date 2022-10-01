import { runQuery } from "../../mongoDB/DB.js";

export const insert = (user) => {
  const query = "INSERT INTO cards_db.game_session(host_id,name,code,id) values (?,?,?,?)";
  console.log("insert", ...user);
  return runQuery(query, [...user]);
};
export const getSessionByCode = (code) => {
  const query = "SELECT id,code,name FROM cards_db.game_session WHERE code = ?";
  return runQuery(query, [code]);
};
// export const getPassByEmail = (email) => {
//   const query = "SELECT password FROM cards_db.game_session WHERE email = ?";
//   return runQuery(query, [email]);
// };
// export const getUserById = (userId) => {
//   const query = "SELECT userName,email,id FROM cards_db.game_session WHERE id = ?";
//   return runQuery(query, [userId]);
// };
