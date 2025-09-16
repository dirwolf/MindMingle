import mongoose from "mongoose";

import Exercise from "../models/exercise.js";

export const getExercise=async(req,res)=>{

    try{

        console.log("cmg");

       

        const exercises=await Exercise.find();

        res.json(exercises);

    }

    catch(error){

        console.log("error fetching exercise:",error);

        res.status(500).json({message:"Failed to fetch exercises"});

    }


 

}

export const fetchExercise=async(req,res)=>{

    try{

        console.log("coming");

        const {id}=req.params;

        // console.log(id)

        if(!mongoose.Types.ObjectId.isValid(id)){

            return res.status(404).json({message:'invalid id'});

        }

        const exercise=await Exercise.findById(id);

        console.log("exercise", exercise);

        if(!exercise){

            return res.status(404).json({message:"Failed to fetch the instructions"});

        }

        console.log(exercise);

        res.json(exercise);

       


 

    }

    catch(error){

        console.error(error);

        res.status(500).json({message:"Server error while fetching the instructions"});


 

    }


 

}