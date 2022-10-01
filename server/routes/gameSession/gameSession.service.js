import randomize from "randomatic";
import {
  addCardToPlayer,
  getFilterdSessionCards,
  getPlayerCards,
  getPlayerList,
  getSessionById,
  insert,
} from "./gameSession.reposetory.js";
import { uniqueNamesGenerator, adjectives, colors, starWars } from "unique-names-generator";

export const createSession = async (userId) => {
  const id = randomize("0", 6);
  await insert({ hostId: userId, name: randomName(), id });
  return id;
};

export const fetchSession = async (id) => {
  const sessionsList = await getSessionById(id);
  const session = sessionsList[0];
  session.turn = (await getPlayerList(id))[session.turn].player_id;
  return sessionsList[0];
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
    await addCardToPlayer(userId, sessionId, (await drawWhiteCard()).id);
  }
};

const drawWhiteCard = async (sessionId) => {
  const cardsList = await getFilterdSessionCards(sessionId, "white");
  return cardsList[Math.floor(Math.random() * cardsList.length)];
};

const randomName = () =>
  uniqueNamesGenerator({
    dictionaries: [adjectives, colors, starWars],
    separator: " ",
  });
