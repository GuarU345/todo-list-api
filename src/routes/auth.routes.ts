import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { authenticate } from "../middlewares/authenticate";
const router = Router();

router.post("/login", UserController.login);
router.post("/register", UserController.register);
router.post("/logout", authenticate, UserController.logout);

export const authRoutes = router;
