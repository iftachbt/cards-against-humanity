import { runQuery } from "../../mongoDB/DB.js";

export const insert = (user) => {
  const query = "INSERT INTO cards_db.user(email,userName,password,id) values (?,?,?,?)";
  return runQuery(query, [...user]);
};
export const getUserByEmail = (email) => {
  const query = "SELECT userName,email,id FROM cards_db.user WHERE email = ?";
  return runQuery(query, [email]);
};
export const getPassByEmail = (email) => {
  const query = "SELECT password FROM cards_db.user WHERE email = ?";
  return runQuery(query, [email]);
};
export const getUserById = (userId) => {
  const query = "SELECT userName,email,id FROM cards_db.user WHERE id = ?";
  return runQuery(query, [userId]);
};
