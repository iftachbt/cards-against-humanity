import { InternalServerError } from "../../error_handling/error.class.js";
import { runQuery } from "../../DB/DB.js";

export const statusMap = {
  IN: "in", //cards that are in player hand
  PLAY: "play", //cards that are waiting for gudge to be selected
  USE: "use", //cards that have been used and are no longer in the game
  WON: "won", //used cards that wone there round
};
export const blackCardColor = "black";

export const insert = (session) => {
  const query = `INSERT INTO ${process.env.DB_NAME}.game_session(host_id,name,id) values (?,?,?)`;
  return runQuery(query, [session.hostId, session.name, session.id]);
};

export const getSessionById = (id) => {
  const query = `SELECT * FROM ${process.env.DB_NAME}.game_session WHERE id = ?`;
  return runQuery(query, [id]);
};
export const updateSessionTurnById = (turn, sessionId) => {
  const query = `UPDATE ${process.env.DB_NAME}.game_session SET turn = ? where id=?`;
  return runQuery(query, [turn, sessionId]);
};

export const addCardToPlayer = (userId, sessionId, cardId) => {
  const query = `INSERT INTO ${process.env.DB_NAME}.game_session_cards(session_id,player_id,card_id) values (?,?,?)`;
  return runQuery(query, [sessionId, userId, cardId]);
};

export const getPlayerList = (sessionId) => {
  const query = `select DISTINCT player_id,userName
  from ${process.env.DB_NAME}.game_session_cards 
  left join ${process.env.DB_NAME}.user on
  ${process.env.DB_NAME}.game_session_cards.player_id = ${process.env.DB_NAME}.user.id
  where session_id = ? and not player_id = ?`;
  return runQuery(query, [sessionId, blackCardColor]);
};

export const getPlayerCards = (sessionId, userId) => {
  const query = `
  SELECT * FROM ${process.env.DB_NAME}.game_session_cards
   left join ${process.env.DB_NAME}.cards on
   ${process.env.DB_NAME}.game_session_cards.card_id = ${process.env.DB_NAME}.cards.id
   WHERE session_id = ? and
   player_id = ? and 
   (status = ? or status = ?)
  `;
  return runQuery(query, [sessionId, userId, statusMap.IN, statusMap.PLAY]);
};
export const getWonCards = (sessionId, userId) => {
  const query = `
  SELECT * FROM ${process.env.DB_NAME}.game_session_cards
   left join ${process.env.DB_NAME}.cards on
   ${process.env.DB_NAME}.game_session_cards.card_id = ${process.env.DB_NAME}.cards.id
   WHERE session_id = ? and
   player_id = ? and 
   status = ?
  `;
  return runQuery(query, [sessionId, userId, statusMap.WON]);
};
export const getSessionBlackCard = (sessionId) => {
  const query = `
  SELECT card_id,text FROM ${process.env.DB_NAME}.game_session_cards
   left join ${process.env.DB_NAME}.cards on
   ${process.env.DB_NAME}.game_session_cards.card_id = ${process.env.DB_NAME}.cards.id
   WHERE session_id = ? and
   player_id = ? and 
   status = ?
  `;
  return runQuery(query, [sessionId, blackCardColor, statusMap.IN]);
};

export const getFilterdSessionCards = (sessionId, color) => {
  const query = `select * from ${process.env.DB_NAME}.cards where color = ? and id not in (SELECT card_id FROM ${process.env.DB_NAME}.game_session_cards WHERE session_id = ?)`;
  return runQuery(query, [color, sessionId]);
};
export const deleteUserFromSession = (playerId, sessionId) => {
  const query = `DELETE FROM ${process.env.DB_NAME}.game_session_cards WHERE player_id=? and session_id=?`;
  return runQuery(query, [playerId, sessionId]);
};
export const getplayedCards = (sessionId) => {
  const query = `
  select * from ${process.env.DB_NAME}.game_session_cards 
  left join ${process.env.DB_NAME}.cards on
  ${process.env.DB_NAME}.game_session_cards.card_id = ${process.env.DB_NAME}.cards.id
  where session_id = ? and status = ?`;
  return runQuery(query, [sessionId, statusMap.PLAY]);
};
export const updateCards = (status, sessionId, card_id) => {
  const query = `UPDATE ${process.env.DB_NAME}.game_session_cards SET status = ? where session_id=? and card_id=?`;
  return runQuery(query, [status, sessionId, card_id]);
};
export const discardPlayedCards = (sessionId) => {
  const query = `UPDATE ${process.env.DB_NAME}.game_session_cards SET status = ? where session_id=? and status=?`;
  return runQuery(query, [statusMap.USE, sessionId, statusMap.PLAY]);
};
