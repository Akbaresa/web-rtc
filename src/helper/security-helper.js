import bcrypt from "bcrypt";

export const hashBcrypt = async (data) => {
    return bcrypt.hash(data, 10);
}