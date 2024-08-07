import Joi from "joi";

const getAllUserRoomValidation = Joi.string().max(100).required();

const joinUserRoomValidation = Joi.object({
    username: Joi.string().max(100).required(),
    kode: Joi.string().max(100).required()
});

export {
    getAllUserRoomValidation,
    joinUserRoomValidation
}