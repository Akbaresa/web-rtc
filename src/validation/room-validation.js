import Joi from "joi";

const createRoomWithPasswordValidation = Joi.string().max(100).required();

const joinUserRoomValidation = Joi.object({
    userId: Joi.string().max(100).required(),
    roomId: Joi.string().max(100).required()
});

const getRoomByKodeValidation = Joi.string().max(100).required();

export {
    createRoomWithPasswordValidation,
    joinUserRoomValidation,
    getRoomByKodeValidation
}