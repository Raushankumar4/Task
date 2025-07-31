import express from "express";
import { createAgent, getAgents } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddlware.js";

const router = express.Router();

router.post("/", protect, createAgent);
router.get("/", protect, getAgents);

export default router;
