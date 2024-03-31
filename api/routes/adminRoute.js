
import express from "express";
import { isAdmin, protectRoute } from "../middleware/protectRoute.js";
import { AdminController } from "../controllers/userController.js";


const router = express.Router();

router.get("/", protectRoute ,isAdmin, AdminController)

export default router;