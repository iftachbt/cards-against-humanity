import { insert, getChatBySessionId as getChatBySessionIdRepo } from "./chat.reposetory.js";

export const addMsg = async (userId, sessionId, msg, winner) => {
  await insert({
    userId,
    sessionId,
    msg,
    winner,
  });
  return getChatBySessionId(sessionId);
};
export const getChatBySessionId = (sessionId) => getChatBySessionIdRepo(sessionId);
