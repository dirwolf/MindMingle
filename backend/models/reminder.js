import mongoose from "mongoose";

const reminderSchema=new mongoose.Schema({

    title:{

        type:String,required:true

    },

    message:{

        type:String


 

    },

    frequency:{

        type:String,

        enum:["daily","weekly"],


 

    },

    time:{

        type:String,required:true

    },

    startDate:{

        type:String,required:true

    },

    user:{

        type:mongoose.Schema.Types.ObjectId,ref:"User",required:true

    }

},{timestamps:true});

export default mongoose.model("Reminder",reminderSchema);