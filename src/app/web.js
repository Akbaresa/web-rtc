import express from "express";
import http from 'http';
import { Server } from 'socket.io';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { publicRouter } from "../routes/public-api.js";
import { headerRouter } from "../routes/api.js";
import videoRouter from "../routes/video-routes.js";
import database from "./database.js";
import { v4 as uuidv4 } from 'uuid';
import userService from '../service/user-service.js';
import roomService from '../service/room-service.js';

dotenv.config();

export const web = express();

web.use(cors({
    origin: 'http://localhost:5173',
}));

web.use(express.json());
web.use(bodyParser.json());

web.use(express.static('public'));

web.use('/api/video', videoRouter);
web.use(publicRouter);
web.use(headerRouter);

export const server = http.createServer(web);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    console.log('a user connected', socket.id);
  
    // Bergabung ke room
    socket.on('join-room', async (roomId, username) => {
    console.log(username);
      try {
        // Periksa jika pengguna ada
        const user = await userService.get(username);
        if (!user) {
          socket.emit('error', 'User not found');
          return;
        }
  
        // Periksa jika room ada
        const room = await roomService.getRoomByKode(roomId);
        if (!room) {
          socket.emit('error', 'Room not found');
          return;
        }
  
        // Bergabung ke room
        socket.join(roomId);
        socket.broadcast.to(roomId).emit('user-connected', username);
  
        // Menangani pengguna yang terputus
        socket.on('disconnect', () => {
          socket.broadcast.to(roomId).emit('user-disconnected', username);
        });
      } catch (error) {
        console.error('Error joining room:', error);
        socket.emit('error', 'An error occurred');
      }
    });
  
    // Signaling untuk WebRTC
    socket.on('signal', (data) => {
      io.to(data.roomId).emit('signal', data);
    });
  });
  

