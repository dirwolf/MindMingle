import Reminder from "../models/reminder.js";

export const setRemainder = async (req, res) => {

    try {

        console.log("cmg");


 

        const { title, frequency, time, message, startDate } = req.body;

        if (!title || !frequency || !time) {

            return res.status(400).json({ message: "Fields are required" });

        }


 

        const reminder = new Reminder({

            title,

            message: message || `It's time for your ${title}`,

            frequency,

            time,

            startDate: startDate || new Date().toISOString(),

            user: req.user.id

        });

        await reminder.save();

        return res.status(201).json({

            message: "Remainder set successfully",

            reminder,


 

        });

    }

    catch (error) {

        console.error("Error saving reminder", error);

        return res.status(500).json({ message: "server error" });

    }

};

export const getReminders = async (req, res) => {

    // console.log(req.user);

    try {


 

        let user = await Reminder.find({ user: req.user.id });

        console.log(user);

        if (user) {

            console.log(user)

            res.status(200).json(user);

        }

    }

    catch (error) {

        res.status(500).json({ message: "Error fetching Reminders" });

    }

}

export const deleteReminders=async(req,res)=>{

    try{

        const reminderId=req.params.id;

        const reminder=await Reminder.findOne({_id:reminderId,user:req.user.id});

        if(!reminder){

            return res.status(404).json({message:"Reminder not found "});

        }

        await Reminder.deleteOne({_id:reminderId});

        return res.status(200).json({message:"Reminder deleted successfully"});

    }

    catch(error){

        console.log("Error in deleting a reminder");

         return res.status(500).json({message:"Server error while deleting a reminder"});

    }

}