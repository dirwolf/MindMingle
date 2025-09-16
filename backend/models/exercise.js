import mongoose from "mongoose";

const exerciseSchema=new mongoose.Schema({

    category:{

        type:String,

        required:true

    },

    image:{

        type:String,

        required:true

    },

    title:{

        type:String,

        required:true

    },

    description:{

        type:String,

        required:true

    },

    instructions:{

        type:[String],

        required:true

    },

    duration:{

        type:String,

        required:true

    }

   

})

export default mongoose.model('Exercise',exerciseSchema);

