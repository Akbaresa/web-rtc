import db from "../app/database.js";
import { ResponseError } from "../error/response-error.js";
import { getUserValidation, loginUserValidation, registerUserValidation, updateUserValidation } from "../validation/user-validation.js";
import { validate } from "../validation/validation.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { hashBcrypt } from "../helper/security-helper.js"

const register = async (request) => {
  const user = validate(registerUserValidation, request);

  const [countUser] = await db.query('SELECT COUNT(*) as count FROM users WHERE username = ?', [user.username]);

  if (countUser[0].count === 1) {
    throw new ResponseError(400, "Username sudah dipakai");
  }
  const [countUserEmail] = await db.query('SELECT COUNT(*) as count FROM users WHERE email = ?', [user.email]);

  if (countUserEmail[0].count === 1) {
    throw new ResponseError(400, "Email sudah dipakai");
  }

  user.password = await hashBcrypt(user.password);

  await db.query('INSERT INTO users (username, nama, email, password) VALUES (?, ?, ?, ?)', 
  [user.username, user.name, user.email, user.password]);

  return {
    username: user.username,
    name: user.name
  };
  
};

const login = async (request) => {
  const loginRequest = validate(loginUserValidation, request);

  const [userRows] = await db.query('SELECT username, password FROM users WHERE username = ?', [loginRequest.username]);

  if (userRows.length === 0) {
    throw new ResponseError(401, "Username or password is incorrect");
  }

  const user = userRows[0];
  const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password);

  if (!isPasswordValid) {
    throw new ResponseError(401, "Username or password is incorrect");
  }

  const token = uuid().toString();

  await db.query('UPDATE users SET token = ? WHERE username = ?', [token, user.username]);

  return { token };
};

const get = async (username) => {
  username = validate(getUserValidation, username);

  const [userRows] = await db.query('SELECT username, nama, email FROM users WHERE username = ?', [username]);

  if (userRows.length === 0) {
    throw new ResponseError(404, "User not found");
  }

  return userRows[0];
};

const update = async (request) => {
  const user = validate(updateUserValidation, request);

  const [totalUser] = await db.query('SELECT COUNT(*) as count FROM users WHERE username = ?', [user.username]);

  if (totalUser[0].count !== 1) {
    throw new ResponseError(404, "User not found");
  }

  const data = {};

  if (user.name) {
    data.name = user.name;
  }
  if (user.username) {
    data.username = user.username;
  }
  if (user.password) {
    data.password = await bcrypt.hash(user.password, 10);
  }

  const updateFields = Object.keys(data).map(field => `${field} = ?`).join(', ');
  const updateValues = [...Object.values(data), user.username];

  await db.query(`UPDATE users SET ${updateFields} WHERE username = ?`, updateValues);

  return {
    username: user.username,
    name: user.name
  };
};

const logout = async (username) => {
  username = validate(getUserValidation, username);

  const [userRows] = await db.query('SELECT username FROM users WHERE username = ?', [username]);

  if (userRows.length === 0) {
    throw new ResponseError(404, "User not found");
  }

  await db.query('UPDATE users SET token = NULL WHERE username = ?', [username]);

  return { username };
};

export default {
  register,
  login,
  get,
  update,
  logout
};
