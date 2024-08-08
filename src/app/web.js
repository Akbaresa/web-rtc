import express from "express";
import http from 'http';
import { Server } from 'socket.io';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { publicRouter } from "../routes/public-api.js";
import { headerRouter } from "../routes/api.js";
import socketRoutes from "../routes/socket.js";

dotenv.config();

export const web = express();
web.use(cors({
    origin: 'http://localhost:5173',
}));
web.use(express.json());
web.use(bodyParser.json());
web.use(express.static('public'));
web.use(publicRouter);
web.use("/api", headerRouter);

export const server = http.createServer(web);
const io = new Server(server, {
  cors: {
      origin: "*",
      methods: ["GET", "POST"]
  }
});
socketRoutes(io);
  

