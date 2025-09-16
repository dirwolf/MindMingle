

import express from "express";

import authMiddleware from "../middleware/authmiddleware.js";

import { createMoodHistory, getMoodHistory } from "../controllers/moodentry.js";

const router = express.Router();

router.post("/moodentry", authMiddleware,createMoodHistory);

router.get("/moodentry",authMiddleware,getMoodHistory);

export default router;