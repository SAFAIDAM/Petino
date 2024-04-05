
import express from "express";
import { isAdmin, protectRoute } from "../middleware/protectRoute.js";
import { AdminController } from "../controllers/userController.js";
import { createRecord, deleteRecord, getRecord, updateRecord } from "../controllers/RecordController.js"

const router = express.Router();
router.get("/records", protectRoute, isAdmin, getRecord)
router.get("/", protectRoute, isAdmin, AdminController)
router.post("/create", protectRoute, isAdmin, createRecord)
router.post("/update/:id", protectRoute, isAdmin, updateRecord)
router.delete("/remove/:id", protectRoute, isAdmin, deleteRecord)


export default router;