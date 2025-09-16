import express from 'express';

import authMiddleware from '../middleware/authmiddleware.js';

import {

 getAnonymousProfile,

 createAnonymousUser,

 searchUsers,

 connectUsers,

 getUserChats,

 getChatMessages

} from '../controllers/anonymousController.js';


 

const router = express.Router();


 

// All routes require authentication

router.use(authMiddleware);


 

// Get existing anonymous user profile

router.get('/profile', getAnonymousProfile);


 

// Create or get anonymous user profile

router.post('/profile', createAnonymousUser);


 

// Search for users with shared experiences

router.get('/search', searchUsers);


 

// Connect with another user

router.post('/connect', connectUsers);


 

// Get user's chats

router.get('/chats', getUserChats);


 

// Get chat messages

router.get('/chats/:chatId/messages', getChatMessages);


 

export default router;