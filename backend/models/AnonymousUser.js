import mongoose from 'mongoose';

const anonymousUserSchema = new mongoose.Schema({

    anonId: {
        type: String,
        required: true,
        unique: true,
        index: true
    },

    realUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    tags: [{
        type: String,
        enum: ['stress', 'anxiety', 'depression', 'productivity', 'relationships', 'work', 'health', 'family', 'school', 'general']
    }],

    status: {
        type: String,
        enum: ['online', 'offline', 'busy'],
        default: 'offline'
    },

    isActive: {
        type: Boolean,
        default: true
    },

    lastSeen: {
        type: Date,
        default: Date.now
    }
}, {

    timestamps: true

});

export default mongoose.model('AnonymousUser', anonymousUserSchema);