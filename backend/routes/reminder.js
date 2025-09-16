

import express from "express";

import authMiddleware from "../middleware/authmiddleware.js";

import { deleteReminders, getReminders,setRemainder } from "../controllers/reminder.js";

const router=express.Router();

router.post("/reminders",authMiddleware,setRemainder);

router.get("/reminders",authMiddleware,getReminders);

router.delete("/reminders/:id",authMiddleware,deleteReminders);

export default router;

