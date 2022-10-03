import { Server } from "socket.io";
import { addMsg, getChatBySessionId } from "../routes/chat/chat.service.js";
import { statusMap } from "../routes/gameSession/gameSession.reposetory.js";
import { changeCardStatus, isRoundDone } from "../routes/gameSession/gameSession.service.js";

export function connectSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL,
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    socket.join(socket.request._query["session_id"]);
    socket.on("session", async (data) => {
      console.log("socket.on", data);
      handleChat(socket, data);
      handleGameEngine(socket, data);
    });
  });

  io.on("disconnect", (socket) => {
    socket.leave(socket.request._query["session_id"]);
  });
}

const handleGameEngine = async (socket, data) => {
  if (data.type === "cardSelected") {
    await changeCardStatus("play", data.sessionId, data.cardId);
    const cards = await isRoundDone(data.sessionId);
    if (cards) {
      console.log("isRoundDone yes");
      console.log("endRound", cards);
      socket.emit("session", { type: "endRound", cards });
      socket.broadcast.emit("session", { type: "endRound", cards });
    } else socket.broadcast.emit("session", { type: "playerSelected", player: data.userId });
  }
  if (data.type === "winnerCard") {
    data.cards.map((card) => {
      card.cardId === data.cardId
        ? changeCardStatus(statusMap.WON, data.sessionId, card.cardId)
        : changeCardStatus(statusMap.USE, data.sessionId, card.cardId);
    });
    socket.broadcast.emit("session", { type: "winnerCard", cardId: data.cardId });
  }
};

const handleChat = async (socket, data) => {
  if (data.type === "getChat") {
    const chatList = await getChatBySessionId(data.sessionId);
    socket.emit("session", { type: "chatList", msg: chatList });
  }
  if (data.type === "chat") {
    const chatList = await addMsg(data.userId, data.sessionId, data.msg);
    socket.emit("session", { type: "chatList", msg: chatList });
    socket.broadcast.emit("session", { type: "chatList", msg: chatList });
  }
};
