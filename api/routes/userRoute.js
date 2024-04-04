import express from "express";
import { updateUser, test, user, username} from "../controllers/userController.js"
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/users", test)
router.get("/username", username)
router.get("/:id", user)
router.post("/update/:id", protectRoute, updateUser)


export default router;