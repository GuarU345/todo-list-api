import { prisma } from "../libs/prisma";
import { TodoBody } from "../types";

const getTodos = async (userId: string) => {
    const todos = await prisma.todo.findMany({
        where: {
            userId
        }
    })

    return todos
}

const createTodo = async (userId: string, body: TodoBody) => {
    const { title } = body

    const user = await prisma.user.findUniqueOrThrow({
        where: {
            id: userId
        }
    });

    if (!user) {
        throw new Error("Usuario no existente")
    }

    try {
        const newTodo = await prisma.todo.create({
            data: {
                title,
                completed: false,
                userId
            }
        })

        return newTodo
    } catch (error) {
        throw new Error("Error al tratar de crear una tarea")
    }
}

const deleteTodo = async (todoId: string) => {
    try {
        return await prisma.todo.delete({
            where: {
                id: todoId
            }
        })
    } catch (error) {
        throw new Error("Error al tratar de eliminar la tarea")
    }
}

const updateCompleted = async (todoId: string, body: any) => {
    const { completed } = body

    try {
        const todo = await prisma.todo.update({
            data: {
                completed
            },
            where: {
                id: todoId
            }
        })
        return todo
    } catch (error) {
        throw new Error("Error al tratar de actualizar el campo completado de la tarea")
    }
}

export const TodoService = {
    getTodos,
    createTodo,
    deleteTodo,
    updateCompleted
}