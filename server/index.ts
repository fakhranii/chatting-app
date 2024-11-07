import { createServer } from 'node:http';
import express from 'express';
import "dotenv/config";
import {DatabaseConnection, DataBaseSource} from "./database/database.config";
import { Server } from "socket.io";
import { join } from 'path'

const app = express();

const publicPath = join(__dirname, '/../public'); // to access the full path of public dir
app.use(express.static(publicPath)); // to make our backend server reach the static files

const server = createServer(app);
const io = new Server(server);

// Connection With DataBase
DatabaseConnection()

io.on('connection', (socket) => {
    console.log('a new user just connected');

    socket.on('disconnect', ()=>{
        console.log('a new user just disconnected');
    })
});

server.listen(process.env.APP_PORT, () => {
    console.log(`Server is running on port ${process.env.APP_PORT}`);
});
