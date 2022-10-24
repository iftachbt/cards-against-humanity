import randomize from "randomatic";
import {
  addCardToPlayer,
  blackCardId,
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
  updateSessionStatusById,
} from "./gameSession.reposetory.js";
import { uniqueNamesGenerator, adjectives, colors, starWars } from "unique-names-generator";

export const createSession = async (userId) => {
  const id = randomize("0", 6);
  await insert({ hostId: userId, name: randomName(), id });
  await addCardToPlayer(blackCardId, id, (await drawCard(id, blackCardId)).id);
  return id;
};

export const fetchSession = async (id) => {
  const sessionsList = await getSessionById(id);
  console.log("sessionsList", sessionsList);
  const session = sessionsList[0];
  const playersList = await getPlayerList(id);
  const playerStatus = await playerStatusArray(id);
  session.turn = playersList[session.turn]?.player_id || 0;
  return { session, playersList, playerStatus };
};
export const fetchBlackCard = async (id) => {
  const card = await getSessionBlackCard(id);
  return card[0];
};
const playerStatusArray = async (id) => {
  const playerStatus = await getplayedCards(id);
  return [...playerStatus].map((ele) => ele.player_id);
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
    updateSessionStatusById(1, sessionId);
    return playedCards;
  }
  return false;
};
export const endJudgeTurn = async (sessionId, winningCard) => {
  updateSessionStatusById(false, sessionId);
  await changeCardStatus(statusMap.WON, sessionId, winningCard);
  discardPlayedCards(sessionId);
};

export const drawCard = async (sessionId, color) => {
  const cardsList = await getFilterdSessionCards(sessionId, color);
  return cardsList[Math.floor(Math.random() * cardsList.length)];
};
export const discardPlayedCardsHandler = (sessionId) => discardPlayedCards(sessionId);

const randomName = () =>
  uniqueNamesGenerator({
    dictionaries: [adjectives, colors, starWars],
    separator: " ",
  });
