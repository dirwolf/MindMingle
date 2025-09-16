

import mongoose from "mongoose";

const goalSchema=new mongoose.Schema({

    user:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},

     mood:{

        type:String

    },

    completed:{

        type:Boolean,

        default:false

    },

    created_at:{

        type:Date,

        default:Date.now

    }

   

});

export default mongoose.model("Goal",goalSchema);