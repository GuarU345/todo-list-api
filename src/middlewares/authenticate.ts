import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Token } from "../models/Token";

export const authenticate = async (req: Request, _res: Response, next: NextFunction) => {
    try {
        const header = req.headers.authorization

        if (!header || !header.startsWith("Bearer ")) {
            throw new Error("No cabecera");
        }

        const token = header.replace("Bearer ", "");

        const tokenExist = await Token.find().where({ jwtSecretKey: token })

        if (!tokenExist) {
            throw new Error("Token Invalido");
        }

        jwt.verify(token, process.env.JWT_KEY || "");
        next();
    } catch (error) {
        next(error)
    }
}