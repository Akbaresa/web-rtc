import Joi from "joi";

const getAllUserRoomValidation = Joi.string().max(100).required();

export {
    getAllUserRoomValidation
}