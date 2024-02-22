import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/UserService";

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newUser = await UserService.signup(req.body)
    return res.json(newUser)
  } catch (error) {
    next(error)
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const credentials = await UserService.signin(req.body)
    return res.json(credentials)
  } catch (error) {
    next(error)
  }
};

const logout = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params

  try {
    const logout = await UserService.logout(userId)
    return res.json(logout)
  } catch (error) {
    next(error)
  }
};

export const UserController = {
  register,
  login,
  logout,
};
