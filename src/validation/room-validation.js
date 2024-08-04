import Joi from "joi";

const createRoomWithPasswordValidation = Joi.string().max(100).required()

export {
    createRoomWithPasswordValidation
}