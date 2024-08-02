import express from "express";
import http from 'http';
import { Server } from 'socket.io';
import bodyParser from 'body-parser';
import cors from 'cors';
import database from "./database.js";
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';
import { publicRouter } from "../routes/public-api.js";
import { headerRouter } from "../routes/api.js";

export const web = express();

dotenv.config();
web.use(express.json());
web.use(bodyParser.json());
web.use(publicRouter);
web.use(headerRouter);
web.use(express.static('public'));
web.use(cors({
    origin: 'http://localhost:5173',
}));