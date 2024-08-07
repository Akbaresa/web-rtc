import db from "../app/database.js";
import { validate } from "../validation/validation.js";
import { createRoomWithPasswordValidation, getRoomByKodeValidation, joinUserRoomValidation } from "../validation/room-validation.js";
import { generateRoomCode } from "../helper/room-helper.js";
import { hashBcrypt } from "../helper/security-helper.js";
import { ResponseError } from "../error/response-error.js";

const createRoomAllowAll = async () => {

    const kode = await generateRoomCode();

    await db.query('INSERT INTO room (kode) VALUES (?)', [kode]);

    return {
        kode : kode
    }
}

const createRoomWithPassword = async ( password ) => {
    validate(createRoomWithPasswordValidation, password);

    const kode = await generateRoomCode();

    const passwordHashed = await hashBcrypt(password);

    await db.query('INSERT INTO room (kode, password) VALUES (?, ?)', [kode, passwordHashed]);

    return {
        kode : kode,
        password : password
    }
}

const getRoomByKode = async (kode) => {
    kode = validate(getRoomByKodeValidation, kode);

    const [roomRows] = await db.query('SELECT * FROM room WHERE kode = ?', [kode]);

    if(roomRows.length === 0){
        throw new ResponseError(404, "Room not found");
    }

    return roomRows[0];
}

const joinUserRoom = async (request) => {
    const userRoom = validate(joinUserRoomValidation, request);

    const [countUserRoom] = await db.query('SELECT COUNT(*) as count FROM user_room WHERE user_id = ? AND room_id = ?', [userRoom.userId, userRoom.roomId]);

    if(countUserRoom[0].count === 1) {
        throw new ResponseError(400, "User sudah masuk");
    }

    await db.query('INSERT INTO user_room (user_id, room_id) VALUES (?, ?)', [userRoom.userId , userRoom.roomId]);

    return {
        userId: userRoom.userId,
        roomId: userRoom.roomId
    }
}

export default {
    createRoomAllowAll,
    createRoomWithPassword,
    joinUserRoom,
    getRoomByKode
}