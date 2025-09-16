

import express from "express";

import {getExercise} from "../controllers/exercise.js";

import { fetchExercise } from "../controllers/exercise.js";

const router=express.Router();

router.get('/exercises',getExercise);

router.get("/exercises/:id",fetchExercise);

export default router;








