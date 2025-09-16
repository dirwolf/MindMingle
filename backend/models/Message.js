

import mongoose from 'mongoose';

// Message model for anonymous chats

// Uses anonId strings for sender and references Chat by ObjectId

const messageSchema = new mongoose.Schema({


 

    senderAnonId: {

        type: String,

        required: true

    },

    content: {

        type: String,

        trim: true,

        required: true,

        maxlength: 1000

    },


 

    chat: {

        type: mongoose.Schema.Types.ObjectId,

        ref: 'Chat',

        required: true

    },

    readByAnonIds: [{

        type: String

    }]

}, { timestamps: true });


 

export default mongoose.model('Message', messageSchema);