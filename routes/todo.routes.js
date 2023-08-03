import { TodoController } from "../controllers/TodoController.js";
import express from "express";
const router = express.Router();

router.get("/api/todos", TodoController.getTodos);
router.get("/api/todos/pendings", TodoController.getPendingsTodos);
router.post("/api/todos", TodoController.createTodo);
router.put("/api/todos/:id", TodoController.updateCompleted);
router.delete("/api/todos/:id", TodoController.deleteTodo);

export const todoRoutes = router;
