import { Server } from "socket.io";
// import { server } from "../index.js";

export function connectSocket(server) {
  const io = new Server(server);

  console.log("got to socket");
  // setInterval(function () {
  const msg = Math.random();
  io.emit("message", msg);
  console.log(msg);
  // }, 11000);

  io.on("connection", function (socket) {
    socket.on("hello", (arg) => {
      console.log(arg); // world
    });
    console.log("A new socket has joined: " + socket.id);

    socket.on("hello", function (data) {
      console.log(data);
    });
  });
}
