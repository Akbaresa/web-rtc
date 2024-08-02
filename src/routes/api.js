import express from "express";
import userController from "../controller/user-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";

const headerRouter = new express.Router();

headerRouter.use(authMiddleware);
headerRouter.get("/api/users/current" , userController.get);

export {
    headerRouter
}