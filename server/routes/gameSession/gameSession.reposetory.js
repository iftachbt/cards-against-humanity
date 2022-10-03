import { runQuery } from "../../mongoDB/DB.js";

export const statusMap = {
  IN: "in", //cards that are in player hand
  PLAY: "play", //cards that are waiting for gudge to be selected
  USE: "use", //cards that have been used and are no longer in the game
  WON: "won", //used cards that wone there round
};
export const blackCardId = "black";

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
  const query = "select DISTINCT player_id from cards_db.game_session_cards where session_id = ? and not player_id = ?";
  return runQuery(query, [sessionId, blackCardId]);
};

export const getPlayerCards = (sessionId, userId) => {
  const query = `
  SELECT * FROM cards_db.game_session_cards
   left join cards_db.cards on
   cards_db.game_session_cards.card_id = cards_db.cards.id
   WHERE session_id = ? and
   player_id = ? and 
   (status = ? or status = ?)
  `;
  return runQuery(query, [sessionId, userId, statusMap.IN, statusMap.PLAY]);
};
export const getSessionBlackCard = (sessionId) => {
  const query = `
  SELECT card_id,text FROM cards_db.game_session_cards
   left join cards_db.cards on
   cards_db.game_session_cards.card_id = cards_db.cards.id
   WHERE session_id = ? and
   player_id = ? and 
   status = ?
  `;
  return runQuery(query, [sessionId, blackCardId, statusMap.IN]);
};

export const getFilterdSessionCards = (sessionId, color) => {
  const query =
    "select * from cards_db.cards where color = ? and id not in (SELECT card_id FROM cards_db.game_session_cards WHERE session_id = ?)";
  return runQuery(query, [color, sessionId]);
};
export const getplayedCards = (sessionId) => {
  const query = `
  select * from cards_db.game_session_cards 
  left join cards_db.cards on
  cards_db.game_session_cards.card_id = cards_db.cards.id
  where session_id = ? and status = ?`;
  return runQuery(query, [sessionId, statusMap.PLAY]);
};
export const updateCards = (status, sessionId, card_id) => {
  const query = "UPDATE cards_db.game_session_cards SET status = ? where session_id=? and card_id=?";
  return runQuery(query, [status, sessionId, card_id]);
};
