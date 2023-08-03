import { Token } from "../models/Token.js";
import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import argon2 from "argon2";

const register = async (req, res) => {
  const { username, email, password } = req.body;

  const hashPassword = await argon2.hash(password);

  const existUsers = await User.find({ email: email });

  if (existUsers.length !== 0) return res.badRequest("user already exist");

  const newUser = new User({
    username: username,
    email: email,
    password: hashPassword,
  });
  try {
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (error) {
    console.error(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const logedUser = {
    email,
    password,
  };

  const isLoged = await User.findOne({ email: logedUser.email });

  if (isLoged === null) return res.sendStatus(401);

  if (!(await argon2.verify(isLoged.password, logedUser.password))) {
    return res.sendStatus(401);
  }

  const secretKey = "keySecret";

  try {
    const token = jwt.sign(
      { id: isLoged._id, email: isLoged.email },
      secretKey
    );

    const newToken = new Token({
      jwtSecretKey: token,
      user: isLoged._id,
    });

    await newToken.save();
    res.json(token);
  } catch (error) {
    return res.sendStatus(400);
  }
};

const logout = async (req, res) => {
  const token = req.headers.authorization;
  const credentials = jwt.verify(token.replace("Bearer ", ""), "keySecret");
  try {
    await Token.findOneAndRemove({ user: credentials.id }).sort({
      createdAt: -1,
    });
  } catch (error) {
    console.error(error);
  }
  res.sendStatus(204);
};

export const getCredentials = async (token) => {
  const credentials = jwt.verify(token, "keySecret");
  return credentials;
};

export const UserController = {
  register,
  login,
  logout,
};
