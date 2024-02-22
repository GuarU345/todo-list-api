import { Router } from "express";
import { authRoutes } from "./auth.routes";
import { todoRoutes } from "./todo.routes";

export const router = Router();

router.use(todoRoutes);
router.use(authRoutes);
