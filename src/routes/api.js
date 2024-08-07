import express from "express";
import userController from "../controller/user-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";
import roomController from "../controller/room-controller.js";
import userRoomController from "../controller/user-room-controller.js";

const headerRouter = new express.Router();

headerRouter.use(authMiddleware);
headerRouter.get("/api/users/current" , userController.get);
headerRouter.post("/api/room/create-room-allow-all", roomController.createRoomAllowAll);
headerRouter.post("/api/room/create-room-password", roomController.createRoomWithPassword);
headerRouter.get("/api/room/get-room", roomController.getRoomByKode);
headerRouter.post("/api/room/join", roomController.joinUserRoom);
headerRouter.post("/api/all-user-room", userRoomController.getAllUserByKodeRoom);

export {
    headerRouter
}