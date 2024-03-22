import { authenticate } from "../middlewares/authenticate";
import { TodoController } from "../controllers/TodoController";
import { Router } from "express";
const router = Router();

router.get("/users/:userId/todos", authenticate, TodoController.getTodos);
router.post("/users/:userId/todos", authenticate, TodoController.createTodo);
router.put("/todos/:id", authenticate, TodoController.updateCompleted);
router.delete("/todos/:id", authenticate, TodoController.deleteTodo);

export const todoRoutes = router;
