import express from "express";
import { protect } from "../middleware/authMiddlware.js";
import upload from "../uploads/upload.js";
import { getAgentTasks, uploadAndDistribute } from "../controllers/taskController.js";


const router = express.Router();

router.post("/upload", protect, upload.single("file"), uploadAndDistribute);
router.get("/agent/:agentId", protect, getAgentTasks);

export default router;
