import db from "../app/database.js";
import { validate } from "../validation/validation.js";
import { generateRoomCode } from "../helper/room-helper.js";
import { hashBcrypt } from "../helper/security-helper.js";
import { ResponseError } from "../error/response-error.js";
import { getAllUserRoomValidation } from "../validation/user-room.validation.js";
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

export default {
    getAllUserRoom
}