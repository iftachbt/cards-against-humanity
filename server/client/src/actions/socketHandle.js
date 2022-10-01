import io from "socket.io-client";

const URL = process.env.REACT_APP_SERVER;
let socket = io.connect(URL, { query: "session_id=123" });

export const getSocket = () => {
  if (!socket) socket = io.connect(URL, { query: "session_id=123" });

  return socket;
};

export function connectSocket() {
  socket.emit("session", { type: "chat", msg: "hello" });
}
export function effectSocket() {
  socket.on("game_msg", (data) => {
    alert(data.msg);
  });
}
