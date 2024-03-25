import express from "express";
import { updateUser, test } from "../controllers/userController.js"
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/", test)
router.post("/update/:id", protectRoute, updateUser)

export default router;