import { ResponseError } from "../error/response-error.js";
import userRoomService from "../service/user-room-service.js";

const getAllUserByKodeRoom = async (req, res, next) => {
    try {
        const result = await userRoomService.getAllUserRoom(req.body.kode);
        return res.status(200).json({
            data: result
        })
    }catch (e) {
        if (e instanceof ResponseError) {
            res.status(e.status).json(e.toJSON());
        } else {
            next(e);
        }
    }
}

const joinUserRoom = async (req, res, next) => {
    try {
        const result = await userRoomService.joinUserRoom(req.body);
        return res.status(200).json({
            data: result
        });
    }catch(e){
        if (e instanceof ResponseError) {
            res.status(e.status).json(e.toJSON());
        } else {
            next(e);
        }
    }
}

export default {
    getAllUserByKodeRoom,
    joinUserRoom
}