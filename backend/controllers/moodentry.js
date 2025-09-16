import MoodEntry from "../models/moodentry.js";

export const createMoodHistory=async(req ,res)=>{

    try{

        const {userId,mood,intensity,notes,timeStamp}=req.body;

        const newEntry=new MoodEntry({

            userId,

            mood,

            intensity,

            notes,

            timeStamp:timeStamp|| new Date()

        });

        await newEntry.save();

        res.status(201).json({message:"Entry saved successfully",entry:newEntry});


 

    }

    catch(error){

        console.log('Error in creating Moond',error);

        res.status(404).json({message:"Server Error while creating moonentry"});

       

       



 

    }

}

export const getMoodHistory=async(req,res)=>{

    try{

        const userId=req.user.id;

        const entries=await MoodEntry.find({userId}).sort({timeStamp:-1});

        console.log(entries);

        res.status(200).json(entries);


 

    }

    catch(error){

        console.error(error);

        res.status(500).json({message:"server error whiile doing mood history"});


 

    }

}