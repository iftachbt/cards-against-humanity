import { getCardById } from "../gameSession/gameSession.reposetory.js";
import { insert, getChatBySessionId as getChatBySessionIdRepo } from "./chat.reposetory.js";

export const addMsg = async (userId, sessionId, msg, winner, blackID) => {
  let blackText = await getCardById(blackID);
  blackText = blackText[0]?.text;
  await insert({
    userId,
    sessionId,
    msg,
    winner,
    blackText,
  });
  return getChatBySessionId(sessionId);
};
export const getChatBySessionId = (sessionId) => getChatBySessionIdRepo(sessionId);
