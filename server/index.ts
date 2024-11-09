import { createServer } from "node:http";
import express from "express";
import "dotenv/config";
import { DatabaseConnection } from "./database/database.config";
import { Server } from "socket.io";
import { join } from "path";
import { generateMessage, generateLocationMessage } from "./utils/message";
import { isRealString } from "./utils/isRealString";

const app = express();

const publicPath = join(__dirname, "/../public"); // to access the full path of public dir
app.use(express.static(publicPath)); // to make our backend server reach the static files

const server = createServer(app);
const io = new Server(server);

// Connection With DataBase
DatabaseConnection();

io.on("connection", (socket: any) => {
  console.log("a new user just connected");

  socket.on("join", (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      callback("Name and room are required");
    }
    socket.join(params.room);
    socket.emit(
      "newMessage",
      generateMessage("Admin", "welcome from the server"),
    );
    socket.broadcast.emit(
      "newMessage",
      generateMessage("Admin", "A new user joined"),
    );
    callback();
  });

  socket.on("createMessage", (message: any, callback) => {
    console.log("listen from server:", message);

    // this option emit (send) data for everyone , because i used "io"
    io.emit("newMessage", generateMessage(message.from, message.text));
    callback("this is the server");

    // this option emit for everyone except the one who creates the event
    // socket.broadcast.emit('newMessage', {
    //     from : message.from,
    //     text: message.text,
    //     createdAt: new Date().getTime()
    // })
  });

  socket.on("createLocationMessage", (coords) => {
    io.emit(
      "newMessage",
      generateLocationMessage("Admin", `${coords.lat}`, `${coords.lng}`),
    );
  });
  socket.on("disconnect", () => {
    console.log("a new user just disconnected");
  });
});

server.listen(process.env.APP_PORT, () => {
  console.log(`Server is running on port ${process.env.APP_PORT}`);
});
