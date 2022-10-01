import { runQuery } from "../../mongoDB/DB.js";

export const insert = (session) => {
  const query = "INSERT INTO cards_db.game_session(host_id,name,id) values (?,?,?)";
  return runQuery(query, [session.hostId, session.name, session.id]);
};

export const getSessionById = (id) => {
  const query = "SELECT id,name FROM cards_db.game_session WHERE id = ?";
  console.log(id);
  return runQuery(query, [id]);
};

export const addCardToPlayer = (userId, sessionId, cardId) => {
  const query = "INSERT INTO cards_db.game_session_cards(session_id,player_id,card_id) values (?,?,?)";
  return runQuery(query, [sessionId, userId, cardId]);
};

export const getPlayerCards = (sessionId, userId) => {
  const query = "SELECT * FROM cards_db.game_session_cards WHERE session_id = ? and player_id = ?";
  return runQuery(query, [sessionId, userId]);
};

export const getFilterdSessionCards = (sessionId, color) => {
  const query =
    "select * from cards_db.cards where color = '?' and id not in (SELECT card_id FROM cards_db.game_session_cards WHERE session_id = ?) ";
  return runQuery(query, [color, sessionId]);
};
