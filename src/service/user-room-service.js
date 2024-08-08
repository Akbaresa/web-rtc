import db from "../app/database.js";
import { validate } from "../validation/validation.js";
import { generateRoomCode } from "../helper/room-helper.js";
import { hashBcrypt } from "../helper/security-helper.js";
import { ResponseError } from "../error/response-error.js";
import { getAllUserRoomValidation, joinUserRoomValidation } from "../validation/user-room.validation.js";
import roomService from "../service/room-service.js";
import { logStringify } from "../helper/log-helper.js";

export const getAllUserRoom = async (kode) => {
    validate(getAllUserRoomValidation, kode);

    const [room] = await db.query('SELECT id_room FROM room WHERE kode = ?', [kode]);
    if (room.length > 0) {
      const roomId = room[0].id_room;
  
      const [userRoomRows] = await db.query(
        'SELECT * FROM user_room JOIN users ON user_room.user_id = users.id_user WHERE user_room.room_id = ?',
        [roomId]
      );
  
      return userRoomRows;
    } else {
      throw new Error('Room not found');
    }
  };

  export const joinUserRoomSocket = async (io, socket, data) => {
        const { kode, username } = data;

        const [room] = await db.query('SELECT * FROM room WHERE kode = ?', [kode]);
        if (!room || room.length === 0) {
            throw new Error('Room not found');
        }
    
        const roomId = room[0].id_room;
    
        const [user] = await db.query('SELECT * FROM users WHERE username = ? ', [username]);
        if (!user || user.length === 0) {
            throw new Error('User not found');
        }
    
        const userId = user[0].id_user;
    
        const [countUserRoom] = await db.query('SELECT COUNT(*) as count FROM user_room WHERE user_id = ? AND room_id = ?', [userId, roomId]);
        if (countUserRoom[0].count === 1) {
            throw new Error('User already in room');
        }
    
        await db.query('INSERT INTO user_room (user_id, room_id) VALUES (?, ?)', [userId, roomId]);
        return {
            user: user[0],
            room: room[0]
        };
  };

export default {
    getAllUserRoom,
    joinUserRoomSocket
}