import { authenticate } from "../middlewares/authenticate";
import { TodoController } from "../controllers/TodoController";
import { Router } from "express";
const router = Router();

router.get("/api/users/:userId/todos", authenticate, TodoController.getTodos);
router.post("/api/users/:userId/todos", authenticate, TodoController.createTodo);
router.put("/api/todos/:id", authenticate, TodoController.updateCompleted);
router.delete("/api/todos/:id", authenticate, TodoController.deleteTodo);

export const todoRoutes = router;
