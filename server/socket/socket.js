import { Server } from "socket.io";
import { addMsg, getChatBySessionId } from "../routes/chat/chat.service.js";

export function connectSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL,
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("????");
    socket.join(socket.request._query["session_id"]);

    socket.on("session", async (data) => {
      console.log("data", data);
      if (data.type === "getChat") {
        const chatList = await getChatBySessionId(data.sessionId);
        socket.emit("session", { type: "chatList", msg: chatList });
      }
      if (data.type === "chat") {
        const chatList = await addMsg(data.userId, data.sessionId, data.msg);
        socket.emit("session", { type: "chatList", msg: chatList });
        socket.broadcast.emit("session", { type: "chatList", msg: chatList });
      }
    });
  });

  io.on("disconnect", (socket) => {
    socket.leave(socket.request._query["session_id"]);
  });
}
