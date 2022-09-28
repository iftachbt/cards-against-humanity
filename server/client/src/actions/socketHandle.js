import { io } from "socket.io-client";

const URL = process.env.REACT_APP_SERVER;
const socket = io(URL);

socket.on("connect", () => {
  console.log(socket.id); // x8WIv7-mJelg7on_ALbx
});

socket.on("disconnect", () => {
  console.log(socket.id); // undefined
});
