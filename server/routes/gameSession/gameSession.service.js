import randomize from "randomatic";
import {
  addCardToPlayer,
  blackCardColor,
  discardPlayedCards,
  getFilterdSessionCards,
  getplayedCards,
  getPlayerCards,
  getPlayerList,
  getSessionBlackCard,
  getSessionById,
  insert,
  statusMap,
  updateCards,
  updateSessionTurnById,
} from "./gameSession.reposetory.js";
import { uniqueNamesGenerator, adjectives, colors, starWars } from "unique-names-generator";

export const createSession = async (userId) => {
  const id = randomize("0", 6);
  await insert({ hostId: userId, name: randomName(), id });
  await addCardToPlayer(blackCardColor, id, (await drawCard(id, blackCardColor)).id);
  return id;
};

export const fetchSession = async (id) => {
  const sessionsList = await getSessionById(id);
  console.log("sessionsList", sessionsList);
  const session = sessionsList[0];
  const playersList = await getPlayerList(id);
  const { playedCards, playerStatus } = await fetchPlayerStatus(id);
  session.turn = playersList[session.turn]?.player_id || 0;
  session.judge = await isRoundDone(id);
  return { session, playersList, playerStatus, playedCards };
};
export const fetchBlackCard = async (id) => {
  const card = await getSessionBlackCard(id);
  return card[0];
};
const fetchPlayerStatus = async (id) => {
  const playedCards = await getplayedCards(id);
  const playerStatus = [...playedCards].map((ele) => ele.player_id);
  return { playedCards, playerStatus };
};

export const fetchPlayerCards = async (sessionId, userId) => {
  let playerCards = await getPlayerCards(sessionId, userId);
  if (!playerCards.length) {
    await addUserToGame(sessionId, userId);
    playerCards = getPlayerCards(sessionId, userId);
  }
  return playerCards;
};
const addUserToGame = async (sessionId, userId) => {
  for (let i = 0; i < 10; i++) {
    await addCardToPlayer(userId, sessionId, (await drawCard(sessionId, "white")).id);
  }
};
export const changeCardStatus = async (status, sessionId, cardId) => {
  await updateCards(status, sessionId, cardId);
};
export const isRoundDone = async (sessionId) => {
  const players = await getPlayerList(sessionId);
  const playedCards = await getplayedCards(sessionId);
  if (players.length - 1 <= playedCards.length) {
    return playedCards;
  }
  return false;
};
export const endJudgeTurn = async (sessionId, winningCard, blackCardId) => {
  await changeCardStatus(statusMap.WON, sessionId, winningCard);
  discardPlayedCards(sessionId);
  await updateCards(statusMap.USE, sessionId, blackCardId);
  const newTurn = await changeJudgeTurn(sessionId);
  const newBlackCard = await drawCard(sessionId, blackCardColor);
  return { newBlackCard, newTurn };
};
const changeJudgeTurn = async (sessionId) => {
  const players = await getPlayerList(sessionId);
  const session = await getSessionById(sessionId);
  const sessionTurn = session[0].turn;
  if (players.length - 1 <= sessionTurn) {
    updateSessionTurnById(0, sessionId);
    return players[0]?.player_id || 0;
  } else {
    updateSessionTurnById(sessionTurn + 1, sessionId);
    return players[sessionTurn + 1]?.player_id || 0;
  }
};
export const drawCard = async (sessionId, color) => {
  const cardsList = await getFilterdSessionCards(sessionId, color);
  const newCard = cardsList[Math.floor(Math.random() * cardsList.length)];
  console.log("newCard", newCard);
  return newCard;
};
export const discardPlayedCardsHandler = (sessionId) => discardPlayedCards(sessionId);

const randomName = () =>
  uniqueNamesGenerator({
    dictionaries: [adjectives, colors, starWars],
    separator: " ",
  });
