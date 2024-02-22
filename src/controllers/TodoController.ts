import { NextFunction, Request, Response } from "express";
import { TodoService } from "../services/TodoService";

const getTodos = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params

  try {
    const todos = await TodoService.getTodos(userId)
    return res.json(todos)
  } catch (error) {
    next(error)
  }
};

const createTodo = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params

  try {
    const newTodo = await TodoService.createTodo(userId, req.body)
    return res.json(newTodo)
  } catch (error) {
    next(error)
  }
};

const deleteTodo = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params

  try {
    await TodoService.deleteTodo(id)
    return res.sendStatus(203)
  } catch (error) {
    next(error)
  }
};

const updateCompleted = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params

  try {
    const updated = await TodoService.updateCompleted(id, req.body)
    return res.json(updated)
  } catch (error) {
    next(error)
  }
};

export const TodoController = {
  getTodos,
  createTodo,
  deleteTodo,
  updateCompleted,
};
