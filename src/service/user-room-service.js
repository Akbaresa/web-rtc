import db from "../app/database.js";
import { validate } from "../validation/validation.js";
import { generateRoomCode } from "../helper/room-helper.js";
import { hashBcrypt } from "../helper/security-helper.js";
import { ResponseError } from "../error/response-error.js";
import { getAllUserRoomValidation, joinUserRoomValidation } from "../validation/user-room.validation.js";
import roomService from "../service/room-service.js";
import { logStringify } from "../helper/log-helper.js";

const getAllUserRoom = async (kode) => {
    validate(getAllUserRoomValidation, kode);

    const room = await roomService.getRoomByKode(kode);

    const [userRoomRow] = await db.query('SELECT * FROM user_room'
    + 'JOIN users ON user_room.user_id = users.id_user WHERE user_room.room_id = ?', 
    [room.id_room]);
    
    return userRoomRow;
}

const joinUserRoom = async (request) => {
    const userRoom = validate(joinUserRoomValidation, request);

    const room = await db.query('SELECT id_room FROM room WHERE kode = ?', [userRoom.kode]);
    const user = await db.query('SELECT id_user FROM users WHERE username = ? ', [userRoom.username]);
    
    const roomId = room[0][0].id_room;
    const userId = user[0][0].id_user;

    const [countUserRoom] = await db.query('SELECT COUNT(*) as count FROM user_room WHERE user_id = ? AND room_id = ?', [userId, roomId]);

    if(countUserRoom[0].count === 1) {
        throw new ResponseError(400, "User sudah masuk");
    }

    await db.query('INSERT INTO user_room (user_id, room_id) VALUES (?, ?)', [userId , roomId]);

    return {
        userId: userId,
        roomId: roomId
    }
}

export default {
    getAllUserRoom,
    joinUserRoom
}