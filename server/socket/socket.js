import socket from "socket.io";
import { server } from "../index.js";

const io = new socket.Server(server);

io.on("connection", function (socket) {
  console.log("A new socket has joined: " + socket.id);

  socket.on("hello", function (data) {
    console.log(data);
  });
});
