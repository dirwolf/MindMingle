import jwt from 'jsonwebtoken';

import { Server } from 'socket.io';

import AnonymousUser from '../models/AnonymousUser.js';

import Chat from '../models/Chat.js';

import Message from '../models/Message.js';


 

// Store active connections

const activeConnections = new Map();

// Bad words filter (simple implementation)

const badWords = ['hate', 'stupid', 'idiot', 'kill', 'die', 'damn', 'hell','fuck','suck','ass'];

const filterMessage = (message) => {

    let filteredMessage = message;

    badWords.forEach(word => {

        const regex = new RegExp(word, 'gi');

        filteredMessage = filteredMessage.replace(regex, '*'.repeat(word.length));

    });

    return filteredMessage;

};


 

// Authenticate socket connection

const authenticateSocket = async (token) => {

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const anonymousUser = await AnonymousUser.findOne({

            realUserId: decoded.id,

            isActive: true

        });

        if (!anonymousUser) {

            throw new Error('Anonymous user not found');

        }

        return anonymousUser;

    } catch (error) {

        throw new Error('Invalid token');

    }

};

// Initialize Socket.io

const initializeSocket = (server) => {

    const io = new Server(server, {

        cors: {

            origin: "http://localhost:3000",

            methods: ["GET", "POST"],

            credentials: true

        }

    });

    io.on('connection', async (socket) => {

        console.log('New socket connection:', socket.id);

        // Authenticate user

        socket.on('authenticate', async (data) => {

            try {

                const { token } = data;

                const anonymousUser = await authenticateSocket(token);

                // Store connection

                activeConnections.set(socket.id, {

                    anonId: anonymousUser.anonId,

                    realUserId: anonymousUser.realUserId

                });

                // Update user status to online

                await AnonymousUser.findOneAndUpdate(

                    { anonId: anonymousUser.anonId },

                    { status: 'online', lastSeen: new Date() }

                );


 

                // Join user to their chat rooms

                const userChats = await Chat.find({

                    participants: anonymousUser.anonId,

                    isActive: true

                });


 

                userChats.forEach(chat => {

                    socket.join(chat._id.toString());

                });

                socket.emit('authenticated', {

                    success: true,

                    anonId: anonymousUser.anonId

                });

                console.log(`User ${anonymousUser.anonId} authenticated and connected`);

            } catch (error) {

                console.error('Socket authentication error:', error);

                socket.emit('authentication_error', { message: error.message });

                socket.disconnect();

            }

        });

        // Handle joining a chat room

        socket.on('join_chat', async (data) => {

            try {

                const { chatId } = data;

                const connection = activeConnections.get(socket.id);

                if (!connection) {

                    socket.emit('error', { message: 'Not authenticated' });

                    return;

                }

                // Verify user is participant in this chat

                const chat = await Chat.findOne({

                    _id: chatId,

                    participants: connection.anonId,

                    isActive: true

                });


 

                if (!chat) {

                    socket.emit('error', { message: 'Chat not found or access denied' });

                    return;

                }

                socket.join(chatId);

                socket.emit('joined_chat', { chatId });

                console.log(`User ${connection.anonId} joined chat ${chatId}`);

            } catch (error) {

                console.error('Join chat error:', error);

                socket.emit('error', { message: 'Failed to join chat' });

            }

        });


 

        // Handle sending messages

        socket.on('send_message', async (data) => {

            try {

                const { chatId, content } = data;

                const connection = activeConnections.get(socket.id);

                if (!connection) {

                    socket.emit('error', { message: 'Not authenticated' });

                    return;

                }

                // Validate message content

                if (!content || content.trim().length === 0) {

                    socket.emit('error', { message: 'Message cannot be empty' });

                    return;

                }

                if (content.length > 1000) {

                    socket.emit('error', { message: 'Message too long' });

                    return;

                }

                // Filter bad words

                const filteredContent = filterMessage(content.trim());

                // Verify user is participant in this chat

                const chat = await Chat.findOne({

                    _id: chatId,

                    participants: connection.anonId,

                    isActive: true

                });


 

                if (!chat) {

                    socket.emit('error', { message: 'Chat not found or access denied' });

                    return;

                }

                // Persist message as separate document

                const savedMessage = await Message.create({

                    senderAnonId: connection.anonId,

                    content: filteredContent,

                    chat: chat._id,

                    readByAnonIds: [connection.anonId]

                });

                chat.lastMessage = new Date();

                chat.latestMessage = savedMessage._id;

                await chat.save();

                // Ensure all connected participants are in the room (handles newly created chats)

                try {

                    const participantAnonIds = chat.participants || [];

                    for (const [sockId, info] of activeConnections.entries()) {

                        if (participantAnonIds.includes(info.anonId)) {

                            const participantSocket = io.sockets.sockets.get(sockId);

                            if (participantSocket) {

                                participantSocket.join(chatId);

                            }

                        }

                    }

                } catch (roomErr) {

                    console.error('Error ensuring participants joined room:', roomErr);

                }

                // Emit message to all participants in the chat room

                io.to(chatId).emit('new_message', {

                    message: {

                        id: savedMessage._id,

                        senderAnonId: savedMessage.senderAnonId,

                        content: savedMessage.content,

                        timestamp: savedMessage.createdAt

                    },

                    chatId

                });

                console.log(`Message sent in chat ${chatId} by ${connection.anonId}`);

            } catch (error) {

                console.error('Send message error:', error);

                socket.emit('error', { message: 'Failed to send message' });

            }

        });

        // Handle user typing

        socket.on('typing', (data) => {

            const { chatId, isTyping } = data;

            const connection = activeConnections.get(socket.id);


 

            if (connection) {

                socket.to(chatId).emit('user_typing', {

                    anonId: connection.anonId,

                    isTyping

                });

            }

        });

        // Handle disconnection

        socket.on('disconnect', async () => {

            try {

                const connection = activeConnections.get(socket.id);

                if (connection) {

                    // Update user status to offline

                    await AnonymousUser.findOneAndUpdate(

                        { anonId: connection.anonId },

                        { status: 'offline', lastSeen: new Date() }

                    );

                    console.log(`User ${connection.anonId} disconnected`);

                }

                activeConnections.delete(socket.id);

            } catch (error) {

                console.error('Disconnect error:', error);

            }

        });

    });

    return io;

};


 

export { initializeSocket, activeConnections };