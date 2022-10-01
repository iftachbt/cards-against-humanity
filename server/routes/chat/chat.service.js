import { insert, getChatBySessionId as getChatBySessionIdRepo } from "./chat.reposetory.js";

export const addMsg = async (userId, sessionId, msg) => {
  await insert({
    userId,
    sessionId,
    msg,
  });
  return getChatBySessionId(sessionId);
};
export const getChatBySessionId = (sessionId) => getChatBySessionIdRepo(sessionId);
