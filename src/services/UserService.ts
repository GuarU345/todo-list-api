import jwt from "jsonwebtoken"
import argon2 from "argon2"
import { UserBody } from "../types";
import { prisma } from "../libs/prisma";


const signup = async (body: UserBody) => {
    const { username, email, password } = body;
    try {
        const hashedPassword = await argon2.hash(password);

        const existUsers = await prisma.user.findFirst({
            where: {
                OR: [
                    {
                        email: email,
                    },
                    {
                        username: username,
                    },
                ],
            },
        });

        if (existUsers && existUsers.email === email) {
            throw new Error("La cuenta con ese email ya existe");
        } else if (existUsers && existUsers.username === username) {
            throw new Error("El nombre de usuario ya existe");
        }

        const newUser = await prisma.user.create({
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

        const isRegister = await prisma.user.findUnique({
            where: {
                email: email,
            },
            include: {
                tokens: true,
            },
        });

        if (!isRegister || !(await argon2.verify(isRegister.password, password))) {
            throw new Error("Credenciales Invalidas");
        }

        const tokenIds = isRegister.tokens.map((token) => token.id);

        if (tokenIds.length > 0) {
            await prisma.token.delete({
                where: {
                    id: tokenIds[0],
                },
            });
        }

        const secretKey = process.env.JWT_KEY || "";

        const token = jwt.sign(
            { id: isRegister.id, email: isRegister.email },
            secretKey
        );

        const newToken = await prisma.token.create({
            data: {
                jwtSecretKey: token,
                userId: isRegister.id,
            },
        });

        return {
            token: newToken.jwtSecretKey,
            user_id: newToken.userId,
        };
    } catch (error) {
        throw new Error("No se ha podido iniciar sesion");
    }
};

const logout = async (userId: string) => {
    try {
        const token = await prisma.token.findFirstOrThrow({
            where: {
                userId
            },
            orderBy: {
                created_at: "desc"
            }
        })
        return await prisma.token.delete({
            where: {
                id: token.id
            }
        })
    } catch (error) {
        throw new Error("Error al tratar de cerrar sesion")
    }
}

export const UserService = {
    signin,
    signup,
    logout
}