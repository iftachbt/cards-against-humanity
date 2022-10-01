import { Server } from "socket.io";

export function connectSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL,
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    socket.join(socket.request._query["session_id"]);

    socket.on("session", (data) => {
      if (data.type === "getChat") {
        socket.emit("session", { type: "chatList", msg: "ENTER HERE CHAT LIST" });
      }
      if (data.type === "chat") {
        socket.emit("session", { type: "chatList", msg: "ENTER HERE CHAT LIST" });
        socket.broadcast.emit("session", { type: "chatList", msg: "ENTER HERE CHAT LIST" });
      }
    });
  });

  io.on("disconnect", (socket) => {
    socket.leave(socket.request._query["session_id"]);
  });
}
