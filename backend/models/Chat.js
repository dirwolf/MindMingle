

import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({

    participants: [{

        type: String, // anonId

        required: true

    }],

    isActive: {

        type: Boolean,

        default: true

    },

    startedBy: {

        type: String, // anonId

        required: true

    },

    lastMessage: {

        type: Date,

        default: Date.now

    },

    latestMessage: {

        type: mongoose.Schema.Types.ObjectId,

        ref: 'Message'

    },

    tags: [{

        type: String,

        enum: ['stress', 'anxiety', 'depression', 'productivity', 'relationships', 'work', 'health', 'family', 'school', 'general']

    }]

}, {

    timestamps: true

});


 

export default mongoose.model('Chat', chatSchema);

