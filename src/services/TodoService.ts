import { Todo } from "../models/Todo";
import { User } from "../models/User";
import { TodoBody } from "../types";

const getTodos = async (userId: string) => {
    const todos = await Todo.find({ user: userId }).sort({
        _id: "desc",
    });

    return todos
}

const createTodo = async (userId: string, body: TodoBody) => {
    const { title } = body

    const user = await User.findById(userId);

    if (!user) {
        throw new Error("Usuario no existente")
    }

    const newTodo = new Todo({
        title: title,
        completed: false,
        user: user._id,
    });

    try {
        const savedTodo = await newTodo.save();
        user.todos = user?.todos.concat(savedTodo._id);
        await user?.save();

        return savedTodo
    } catch (error) {
        throw new Error("Error al tratar de crear la tarea")
    }
}

const deleteTodo = async (todoId: string) => {
    try {
        return await Todo.findByIdAndRemove(todoId);
    } catch (error) {
        throw new Error("Error al tratar de eliminar la tarea")
    }
}

const getPendingsTodos = async (userId: string) => {
    try {
        const todos = await Todo.find({})
            .where({ completed: false, user: userId })
            .count();
        return todos
    } catch (error) {
        throw new Error("Error al tratar de traer las tareas pendientes")
    }
}

const updateCompleted = async (todoId: string, body: any) => {
    const { completed } = body

    try {
        const todo = await Todo.findByIdAndUpdate(todoId, completed, { new: true });
        return todo
    } catch (error) {
        throw new Error("Error al tratar de actualizar el campo completado de la tarea")
    }
}

export const TodoService = {
    getTodos,
    createTodo,
    deleteTodo,
    getPendingsTodos,
    updateCompleted
}