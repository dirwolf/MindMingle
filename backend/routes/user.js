import express from "express";

import {signup,login} from "../controllers/user.js";

import authMiddleware from "../middleware/authmiddleware.js";

import { getCurrentUser } from "../controllers/authController.js";

const router=express.Router();

router.post("/signup",signup);

router.post("/login",login);

router.get('/me',authMiddleware,getCurrentUser);

export default router;

