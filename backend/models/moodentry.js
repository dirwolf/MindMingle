import mongoose from "mongoose";

const moodEntrySchema = new mongoose.Schema({

    userId: {

        type: mongoose.Schema.Types.ObjectId,

        ref: 'User',

        required: true

    },

    mood: {

        type: String,

        required: true

    },

    intensity: {

        type: Number,

        required: true,

        min: 1,

        max: 10

    },

    notes: {

        type: String,

        default: ''

    },

    timestamp: {

        type: Date,

        default: Date.now

    },

    createdAt: {

        type: Date,

        default: Date.now

    }

});

export default mongoose.model('MoodEntry',moodEntrySchema);