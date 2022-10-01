import { runQuery } from "../../mongoDB/DB.js";

export const insert = (session) => {
  console.log("session", session);
  const query = "INSERT INTO cards_db.game_session(host_id,name,id) values (?,?,?)";
  return runQuery(query, [session.hostId, session.name, session.id]);
};

export const getSessionById = (id) => {
  const query = "SELECT id,name,turn FROM cards_db.game_session WHERE id = ?";
  return runQuery(query, [id]);
};

export const addCardToPlayer = (userId, sessionId, cardId) => {
  const query = "INSERT INTO cards_db.game_session_cards(session_id,player_id,card_id) values (?,?,?)";
  return runQuery(query, [sessionId, userId, cardId]);
};

export const getPlayerList = (sessionId) => {
  const query = "select DISTINCT player_id from cards_db.game_session_cards where session_id = ?";
  return runQuery(query, [sessionId]);
};

export const getPlayerCards = (sessionId, userId) => {
  const query = `
  SELECT * FROM cards_db.game_session_cards
   left join cards_db.cards on
   cards_db.game_session_cards.card_id = cards_db.cards.id
   WHERE session_id = ? and
   player_id = ? and 
   (status = 'in' or status = 'play')
  `;
  return runQuery(query, [sessionId, userId]);
};

export const getFilterdSessionCards = (sessionId, color) => {
  const query =
    "select * from cards_db.cards where color = ? and id not in (SELECT card_id FROM cards_db.game_session_cards WHERE session_id = ?)";
  return runQuery(query, [color, sessionId]);
};
