import jwt from "jsonwebtoken"
import argon2 from "argon2"
import { UserBody } from "../types";
import { User } from "../models/User";
import { Token } from "../models/Token";


const signup = async (body: UserBody) => {
    const { username, email, password } = body;
    try {
        const hashedPassword = await argon2.hash(password);

        const existUsers = await User.findOne().or([{ email: email }, { username: username }])

        if (existUsers && existUsers.email === email) {
            throw new Error("La cuenta con ese email ya existe");
        } else if (existUsers && existUsers.username === username) {
            throw new Error("El nombre de usuario ya existe");
        }

        const newUser = await User.create({
            data: {
                username,
                email,
                password: hashedPassword,
            },
        });

        return newUser;
    } catch (error) {
        throw new Error("Error al intentar registrarte");
    }
};

const signin = async (body: UserBody) => {
    try {
        const { email, password } = body;

        const isRegister = await User.findOne().where({ email: email })

        if (!isRegister || !(await argon2.verify(isRegister.password!, password))) {
            throw new Error("Credenciales Invalidas");
        }

        const tokens = await Token.find().where({ user: isRegister._id })

        const tokenIds = tokens.map(token => token.id);

        if (tokenIds.length > 0) {
            await Token.deleteMany({ _id: { $in: tokenIds } });
        }

        const secretKey = process.env.JWT_KEY || "";

        const token = jwt.sign(
            { id: isRegister.id, email: isRegister.email },
            secretKey
        );

        const newToken = await Token.create({
            data: {
                jwtSecretKey: token,
                user_id: isRegister.id,
            },
        });

        return {
            token: newToken.jwtSecretKey,
            user_id: newToken.user?._id,
        };
    } catch (error) {
        throw new Error("No se ha podido iniciar sesion");
    }
};

const logout = async (userId: string) => {
    try {
        await Token.findOneAndRemove({ user: userId }).sort({
            createdAt: -1,
        });
    } catch (error) {
        throw new Error("Error al tratar de cerrar sesion")
    }
}

export const UserService = {
    signin,
    signup,
    logout
}