
import express from "express";
import { isAdmin, protectRoute } from "../middleware/protectRoute.js";
import { AdminController } from "../controllers/userController.js";
import { createRecord, deleteRecord, getRecord, getRecordById, updateRecord } from "../controllers/RecordController.js"

const router = express.Router();
router.get("/records", protectRoute, isAdmin, getRecord)
router.get("/record/:id", protectRoute, isAdmin, getRecordById)
router.post("/createRecord", protectRoute, isAdmin, createRecord)
router.post("/updateRecord/:id", protectRoute, isAdmin, updateRecord)
router.delete("/remove/:id", protectRoute, isAdmin, deleteRecord)



export default router;