import { Server } from "socket.io";
import { addMsg, getChatBySessionId } from "../routes/chat/chat.service.js";
import { statusMap } from "../routes/gameSession/gameSession.reposetory.js";
import {
  changeCardStatus,
  changeJudgeTurn,
  endJudgeTurn,
  fetchPlayerStatus,
  fetchSession,
  isRoundDone,
  isUserTurn,
  removeUserFromGame,
} from "../routes/gameSession/gameSession.service.js";

export function connectSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL,
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    socket.join(socket.request._query["session_id"]);
    console.log("socket rooms", io.sockets.adapter.rooms.get(socket.request._query["session_id"]));
    socket.on("session", async (data) => {
      handleChat(socket, data);
      handleGameEngine(socket, data, io);
    });

    socket.on("disconnect", function () {
      console.log("leave rooms", io.sockets.adapter.rooms.get(socket.request._query["session_id"]));
    });
  });
}

const handleGameEngine = async (socket, data) => {
  if (data.type === "newUser") {
    const { playersList } = await fetchSession(data.sessionId);
    socket.broadcast.emit("session", { type: "update", playersList: playersList, refresh: true });
  }
  if (data.type === "cardSelected") {
    await changeCardStatus("play", data.sessionId, data.cardId);
    const cards = await isRoundDone(data.sessionId);
    const { playerStatus } = await fetchPlayerStatus(data.sessionId);
    if (cards) {
      socket.emit("session", { type: "update", selectedCards: cards, status: playerStatus });
      socket.broadcast.emit("session", { type: "update", selectedCards: cards, status: playerStatus });
    } else {
      socket.broadcast.emit("session", { type: "update", status: playerStatus });
      socket.emit("session", { type: "update", status: playerStatus });
    }
  }
  if (data.type === "winnerCard") {
    const { newBlackCard, newTurn, playersList, gameOver } = await endJudgeTurn(
      data.sessionId,
      data.cardId,
      data.blackCardId
    );
    const winnerPlayerName = playersList.find((player) => player.player_id === data.playerId).userName;
    let chatList = await addMsg("admin", data.sessionId, data.cardText, winnerPlayerName, data.blackCardId);
    socket.broadcast.emit("session", { type: "chatList", msg: chatList });
    socket.emit("session", { type: "chatList", msg: chatList });
    socket.broadcast.emit("session", {
      type: "update",
      winnerId: data.cardId,
      newBlackCard,
      newTurn,
      playersList,
      gameOver,
    });
    socket.emit("session", { type: "update", winnerId: data.cardId, newBlackCard, newTurn, playersList, gameOver });
  }
  if (data.type === "leaveGame") {
    let newTurn = null;
    if (await isUserTurn(data.sessionId, data.userId)) newTurn = await changeJudgeTurn(data.sessionId);
    const playersList = await removeUserFromGame(data.sessionId, data.userId);
    const cards = await isRoundDone(data.sessionId);
    socket.broadcast.emit("session", { type: "update", playersList, newTurn, selectedCards: cards });
  }
  if (data.type === "kickOutUser") {
    socket.broadcast.emit("session", { type: "update", leave: data.userId });
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
