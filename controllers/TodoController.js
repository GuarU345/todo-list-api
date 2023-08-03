import { Todo } from "../models/Todo.js";
import { User } from "../models/User.js";
import jwt from "jsonwebtoken";

const getTodos = async (req, res) => {
  const token = req.headers.authorization;

  const information = jwt.verify(token, "keySecret");

  const titles = await Todo.find({ user: information.id }).sort({
    _id: "desc",
  });

  res.json(titles);
};

const createTodo = async (req, res, next) => {
  const { title } = req.body;
  const token = req.headers.authorization;
  const credentials = jwt.verify(token, "keySecret");

  const user = await User.findById(credentials.id);

  if (user === null) return res.status(404).send("user not found");

  const newTodo = new Todo({
    title: title,
    completed: false,
    user: user._id,
  });
  try {
    const savedTodo = await newTodo.save();
    user.todos = user?.todos.concat(savedTodo._id);
    await user?.save();

    res.json(savedTodo);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const deleteTodo = async (req, res, next) => {
  const id = req.params.id;
  try {
    await Todo.findByIdAndRemove(id);
    res.sendStatus(203);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getPendingsTodos = async (req, res) => {
  const token = req.headers.authorization;
  const credentials = jwt.verify(token, "keySecret");
  const todos = await Todo.find({})
    .where({ completed: false, user: credentials.id })
    .count();
  return res.json(todos);
};

const updateCompleted = async (req, res) => {
  const id = req.params.id;
  const completed = req.body.completed;
  const newValue = {
    completed: completed,
  };
  const todo = await Todo.findByIdAndUpdate(id, newValue, { new: true });
  return res.json(todo);
};

export const TodoController = {
  getTodos,
  createTodo,
  deleteTodo,
  getPendingsTodos,
  updateCompleted,
};
