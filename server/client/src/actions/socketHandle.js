import { io } from "socket.io-client";

export function connectSocket() {
  console.log("???????????");
  const URL = process.env.REACT_APP_SERVER;
  const socket = io(URL);
  socket.on("message", function (msg) {
    console.log("one " + msg);
  });
  socket.on("connect", () => {
    console.log(socket.id); // x8WIv7-mJelg7on_ALbx
    socket.emit("hello", "world");
    socket.on("message", function (msg) {
      console.log("one " + msg);
    });
  });
  socket.emit("hello", "world1");

  socket.on("disconnect", () => {
    console.log(socket.id); // undefined
  });
}
