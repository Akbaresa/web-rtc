import express from "express";
import userController from "../controller/user-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";
import roomController from "../controller/room-controller.js";
import userRoomController from "../controller/user-room-controller.js";

const headerRouter = new express.Router();

headerRouter.use(authMiddleware);
headerRouter.get("/users/current" , userController.get);
headerRouter.post("/room/create-room-allow-all", roomController.createRoomAllowAll);
headerRouter.post("/room/create-room-password", roomController.createRoomWithPassword);
headerRouter.get("/room/get-room", roomController.getRoomByKode);
headerRouter.post("/room/join", userRoomController.joinUserRoom);
headerRouter.post("/all-user-room", userRoomController.getAllUserByKodeRoom);

export {
    headerRouter
}