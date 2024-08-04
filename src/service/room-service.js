import db from "../app/database.js";
import { validate } from "../validation/validation.js";
import { createRoomWithPasswordValidation } from "../validation/room-validation.js";
import { generateRoomCode } from "../helper/room-helper.js";
import { hashBcrypt } from "../helper/security-helper.js";

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



export default {
    createRoomAllowAll,
    createRoomWithPassword
}