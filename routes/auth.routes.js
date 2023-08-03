import express from "express";
import { UserController } from "../controllers/UserController.js";
const router = express.Router();

router.post("/login", UserController.login);
router.post("/register", UserController.register);
router.post("/logout", UserController.logout);

export const authRoutes = router;
