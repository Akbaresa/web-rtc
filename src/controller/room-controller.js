import { ResponseError } from "../error/response-error.js";
import roomService from "../service/room-service.js";


const createRoomAllowAll = async (req , res , next) => {
    try {
        const result = await roomService.createRoomAllowAll();
        res.status(200).json({
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

const createRoomWithPassword = async (req, res, next) => {
    try {
        const password = req.body.password;
        const result = await roomService.createRoomWithPassword(password);
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

const getRoomByKode = async (req, res, next) => {
    try {
        const result = await roomService.getRoomByKode(req.body.kode);
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
    createRoomAllowAll,
    createRoomWithPassword,
    getRoomByKode
}