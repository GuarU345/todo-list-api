import express from "express";
import { authRoutes } from "./auth.routes.js";
import { todoRoutes } from "./todo.routes.js";

const router = express();

router.use(todoRoutes);
router.use(authRoutes);

export default router;
