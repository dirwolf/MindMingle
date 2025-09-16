import Goal from "../models/Goal.js";

export const getGoal = async (req, res) => {

    try {

        const goals = await Goal.find({ user: req.user._id });

        res.json(goals);

    }

    catch (error) {

        res.status(500).json({ message: "server error " });

    }

}

export const createGoal = async (req, res) => {

    try {

        const { mood, notes,enable } = req.body;

        const goal = new Goal({

            user: req.user.id,

            mood,

           

        });

        const savedGoal = await goal.save();

        res.status(201).json(savedGoal);

    }

    catch (error) {

        res.status(500).json({ message: "server error" });

    }

}


 

export const deleteGoal = async (req, res) => {

    try {

    const goal = await Goal.deleteOne({"_id": req.params.id});

    if(goal.modifiedCount > 0){

        res.json({ message: "Goal removed" });

    }else{

        res.json({message: "Error in deleting"});

    }

        console.log("goal removed");
    }

    catch (error) {

        res.status(500).json({ message: "Server error" });

    }

}

export const toggle=async(req,res)=>{

    try{

        const goal=await Goal.findById(req.params.id);

        if(!goal){

            return res.status(404).json({message:"Goal not found"});

        }

        console.log('Current goal status:', goal.completed);

        goal.completed=!goal.completed;

        const updatedGoal=await goal.save();

        res.json(updatedGoal);

    }

    catch(error){

        console.error('Toggle error:', error);

        res.status(500).json({message:"server error"});

    }

};