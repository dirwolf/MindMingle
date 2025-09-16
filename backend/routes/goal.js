

import express from "express";

import  Goal from "../models/Goal.js";

import authMiddleware from "../middleware/authmiddleware.js";

import { createGoal, deleteGoal, getGoal, toggle  } from "../controllers/goal.js";


 

const router=express.Router();

router.get("/goal",authMiddleware,getGoal);

router.post("/goal",authMiddleware,createGoal);

router.delete("/goal/:id",deleteGoal);

router.patch('/goal/:id/toggle',toggle);


 

export default router;