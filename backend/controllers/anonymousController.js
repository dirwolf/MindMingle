import AnonymousUser from '../models/AnonymousUser.js';

import Chat from '../models/Chat.js';

import Message from '../models/Message.js';

import {User} from '../models/user.js';

import { v4 as uuidv4 } from 'uuid';

// Generate anonymous ID


 

const generateAnonId = () => {

    const adjectives = ['Calm', 'Wise', 'Kind', 'Gentle', 'Peaceful', 'Serene', 'Warm', 'Bright', 'Hopeful', 'Strong'];

    const nouns = ['Soul', 'Heart', 'Mind', 'Spirit', 'Friend', 'Listener', 'Helper', 'Guide', 'Companion', 'Supporter'];

    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];

    const noun = nouns[Math.floor(Math.random() * nouns.length)];

    const number = Math.floor(Math.random() * 999) + 1;

    return `${adjective}${noun}${number}`;

};

// Get existing anonymous user profile


 

const getAnonymousProfile = async (req, res) => {

    try {

        const userId = req.user.id;

        const anonymousUser = await AnonymousUser.findOne({ realUserId: userId, isActive: true });


        console.log("Get anonymous profile called .. Here is GET anonymous user backend : ", anonymousUser)

        if (anonymousUser) {

            // Update status to online

            anonymousUser.status = 'online';

            anonymousUser.lastSeen = new Date();

            await anonymousUser.save();

            res.json({

                success: true,

                anonymousUser: {

                    anonId: anonymousUser.anonId,

                    tags: anonymousUser.tags,

                    status: anonymousUser.status

                }

            });

        } else {

            console.log("getAnonymousProfile :Here is returned error 404 not GET anonymous user backend : ", anonymousUser)

            res.status(404).json({

                success: false,

                message: 'No anonymous profile found'

            });

        }

    } catch (error) {

        console.error('Error getting anonymous profile:', error);

        res.status(500).json({

            success: false,

            message: 'Failed to get anonymous profile',

            error: error.message

        });

    }

};


 

// Create or get anonymous user

const createAnonymousUser = async (req, res) => {

    try {

        let { tags } = req.body;

        const userId = req.user.id;

        console.log("createAnonymousUser : " + userId + tags);


        // Check if user already has an anonymous profile

        let anonymousUser = await AnonymousUser.findOne({ realUserId: userId, isActive: true });
        console.log("Anonymous user found : ",anonymousUser);

        if (anonymousUser) {

            // Update tags and status
            console.log("Updating tags ....",tags);

            anonymousUser.tags = tags || [];

            anonymousUser.status = 'online';

            anonymousUser.lastSeen = new Date();

            console.log("createAnonymousUser :Here is updated one anonymous user created from backend : ", anonymousUser)

            await anonymousUser.save();

        } else {

            // Create new anonymous user
            console.log("New anonymous user banane ki naubat aagayi ")
            const anonId = generateAnonId();

            if (!tags || tags.length === 0) {

                const realUser = await User.findById(userId);

                tags = Array.isArray(realUser?.tags) ? realUser.tags : [];

            }

            anonymousUser = new AnonymousUser({

                anonId,

                realUserId: userId,

                tags: tags || [],

                status: 'online',

                lastSeen: new Date()

            });

            console.log("createAnonymousUser :Here is new anonymous user created from backend: ", anonymousUser)

            await anonymousUser.save();

        }

        res.json({

            success: true,

            anonymousUser: {

                anonId: anonymousUser.anonId,

                tags: anonymousUser.tags,

                status: anonymousUser.status

            }

        });

    } catch (error) {

        console.error('Error creating anonymous user:', error);

        res.status(500).json({

            success: false,

            message: 'Internal server error',

            error: error.message

        });

    }

};


 

// Search for users with shared experiences

const searchUsers = async (req, res) => {

    try {

        const { tag } = req.query;

        const currentUserId = req.user.id;

        // Get current user's anonymous profile

        const currentAnonUser = await AnonymousUser.findOne({

            realUserId: currentUserId,

            isActive: true

        });

        if (!currentAnonUser) {

            return res.status(404).json({

                success: false,

                message: 'Anonymous profile not found'

            });

        }

        // Build search query

        let searchQuery = {

            isActive: true,

            status: 'online',

            realUserId: { $ne: currentUserId } // Exclude current user

        };

        // Add tag filter if provided

        if (tag) {

            if (Array.isArray(tag)) {

                // Multiple tags - find users who have any of these tags

                searchQuery.tags = { $in: tag };

                console.log('Searching with array tags:', tag);

            } else if (typeof tag === 'string' && tag.includes(',')) {

                // Comma-separated tags

                const tags = tag.split(',').map(t => t.trim()).filter(t => t);

                searchQuery.tags = { $in: tags };

                console.log('Searching with comma-separated tags:', tags);

            } else {

                // Single tag

                searchQuery.tags = tag;

                console.log('Searching with single tag:', tag);

            }

        } else {

            console.log('Searching all users (no tag filter)');

        }

        console.log('Final search query:', JSON.stringify(searchQuery, null, 2));


 

        const availableUsers = await AnonymousUser.find(searchQuery)

            .select('anonId tags status lastSeen')

            .limit(20)

            .sort({ lastSeen: -1 });


 

        console.log('Found users:', availableUsers.length);

        console.log('Users found:', availableUsers.map(u => ({ anonId: u.anonId, tags: u.tags })));


 

        res.json({

            success: true,

            users: availableUsers.map(user => ({

                anonId: user.anonId,

                tags: user.tags,

                status: user.status,

                lastSeen: user.lastSeen

            }))

        });

    } catch (error) {

        console.error('Error searching users:', error);

        res.status(500).json({ success: false, message: 'Internal server error' });

    }

};


 

// Connect two users anonymously

const connectUsers = async (req, res) => {

    try {

        // Extract target anonymous ID from request body

        const { targetAnonId } = req.body;

        // req.user.id comes from the JWT authentication middleware

        // It contains the real user's ID that was set during login

        const currentUserId = req.user.id;

        // Get current user's anonymous profile

        const currentAnonUser = await AnonymousUser.findOne({

            realUserId: currentUserId,

            isActive: true

        });


 

        if (!currentAnonUser) {

            return res.status(404).json({

                success: false,

                message: 'Anonymous profile not found'

            });

        }

        // Get target user

        const targetAnonUser = await AnonymousUser.findOne({

            anonId: targetAnonId,

            isActive: true

        });


 

        if (!targetAnonUser) {

            return res.status(404).json({

                success: false,

                message: 'Target user not found'

            });

        }


 

        // Note: Block functionality has been removed, so no blocking checks needed

        // Check if chat already exists

        let existingChat = await Chat.findOne({

            participants: { $all: [currentAnonUser.anonId, targetAnonId] },

            isActive: true

        });


 

        if (existingChat) {

            return res.json({

                success: true,

                chatId: existingChat._id,

                participants: existingChat.participants,

                message: 'Chat already exists'

            });


 

        }


 

        // Create new chat

        const newChat = new Chat({

            participants: [currentAnonUser.anonId, targetAnonId],

            startedBy: currentAnonUser.anonId,

            tags: [...new Set([...currentAnonUser.tags, ...targetAnonUser.tags])]

        });


 

        await newChat.save();

        res.json({

            success: true,

            chatId: newChat._id,

            participants: newChat.participants,

            message: 'Chat created successfully'

        });

    } catch (error) {

        console.error('Error connecting users:', error);

        res.status(500).json({ success: false, message: 'Internal server error' });

    }

};

// Get user's chats

const getUserChats = async (req, res) => {

    try {

        const currentUserId = req.user.id;

        // Get current user's anonymous profile

        const currentAnonUser = await AnonymousUser.findOne({

            realUserId: currentUserId,

            isActive: true

        });

        if (!currentAnonUser) {

            return res.status(404).json({

                success: false,

                message: 'Anonymous profile not found'

            });

        }

        // Get user's chats

        const chats = await Chat.find({

            participants: currentAnonUser.anonId,

            isActive: true

        })

            .populate('latestMessage')

            .sort({ lastMessage: -1 })

            .limit(50);

        // Compute messageCount via Message collection

        const chatIds = chats.map(c => c._id);

        const counts = await Message.aggregate([

            { $match: { chat: { $in: chatIds } } },

            { $group: { _id: '$chat', count: { $sum: 1 } } }

        ]);


 

        const countMap = counts.reduce((acc, c) => { acc[c._id.toString()] = c.count; return acc; }, {});


 

        res.json({

            success: true,

            chats: chats.map(chat => ({

                chatId: chat._id,

                participants: chat.participants,

                lastMessage: chat.lastMessage,

                latestMessage: chat.latestMessage ? {

                    id: chat.latestMessage._id,

                    senderAnonId: chat.latestMessage.senderAnonId,

                    content: chat.latestMessage.content,

                    timestamp: chat.latestMessage.createdAt

                } : null,

                messageCount: countMap[chat._id.toString()] || 0,

                tags: chat.tags

            }))

        });

    } catch (error) {

        console.error('Error getting user chats:', error);

        res.status(500).json({ success: false, message: 'Internal server error' });

    }

};


 

// Get chat messages

const getChatMessages = async (req, res) => {

    try {

        const { chatId } = req.params;

        const currentUserId = req.user.id;

        // Get current user's anonymous profile

        const currentAnonUser = await AnonymousUser.findOne({

            realUserId: currentUserId,

            isActive: true

        });


 

        if (!currentAnonUser) {

            return res.status(404).json({

                success: false,

                message: 'Anonymous profile not found'

            });

        }


 

        // Get chat

        const chat = await Chat.findOne({

            _id: chatId,

            participants: currentAnonUser.anonId,

            isActive: true

        });


 

        if (!chat) {

            return res.status(404).json({

                success: false,

                message: 'Chat not found'

            });

        }

        const messages = await Message.find({ chat: chat._id }).sort({ createdAt: 1 });

        res.json({

            success: true,

            messages: messages.map(msg => ({

                id: msg._id,

                senderAnonId: msg.senderAnonId,

                content: msg.content,

                timestamp: msg.createdAt

            }))

        });

    } catch (error) {

        console.error('Error getting chat messages:', error);

        res.status(500).json({ success: false, message: 'Internal server error' });

    }

};


 

export {

    getAnonymousProfile,

    createAnonymousUser,

    searchUsers,

    connectUsers,

    getUserChats,

    getChatMessages

};