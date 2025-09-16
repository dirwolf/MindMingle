import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';

import io from 'socket.io-client';

import axios from 'axios';

import { useAuth } from './AuthContext';


 

const AnonymousContext = createContext();


export const useAnonymous = () => {

    const context = useContext(AnonymousContext);

    if (!context) {

        throw new Error('useAnonymous must be used within an AnonymousProvider');

    }

    return context;

};


 

export const AnonymousProvider = ({ children }) => {

    const { user, token } = useAuth();

    const [socket, setSocket] = useState(null);

    const [isConnected, setIsConnected] = useState(false);

    const [anonymousUser, setAnonymousUser] = useState(null);

    const [availableUsers, setAvailableUsers] = useState([]);

    const [userChats, setUserChats] = useState([]);

    const [currentChat, setCurrentChat] = useState(null);

    const [messages, setMessages] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    const [error, setError] = useState(null);

    const loadingChatsRef = useRef(new Set());

    const joiningChatRef = useRef(null);

    const profileCheckedRef = useRef(false);

    const currentChatRef = useRef(null);



 

    useEffect(() => {

        currentChatRef.current = currentChat;

    }, [currentChat]);


 

    // Check for existing anonymous profile (exported function)


 

    const checkExistingProfile = useCallback(async () => {

        // Prevent multiple simultaneous calls


 

        if (profileCheckedRef.current) {

            console.log('Profile already being checked, skipping...');

            return null;


 

        }

        try {

            profileCheckedRef.current = true;

            console.log('checkExistingProfile called');

            setIsLoading(true);

            setError(null);


 

            const response = await axios.get('http://localhost:5001/api/anonymous/profile', {

                headers: { Authorization: `Bearer ${token}` }

            });

            if (response.data.success && response.data.anonymousUser) {

                setAnonymousUser(response.data.anonymousUser);

                return response.data.anonymousUser;

            }

            console.log('No anonymous profile found (success: false)');

            return null;

        } catch (err) {

            // If no profile exists, auto-create an empty one to avoid first-time 404 UX

            if (err.response?.status === 404) {

                console.log('No anonymous profile found (404) - creating default profile');

                try {

                    const createRes = await axios.post('http://localhost:5001/api/anonymous/profile', { tags: [] }, {

                        headers: { Authorization: `Bearer ${token}` }

                    });

                    if (createRes.data?.anonymousUser) {

                        setAnonymousUser(createRes.data.anonymousUser);

                        return createRes.data.anonymousUser;

                    }

                } catch (createErr) {

                    console.error('Auto-create anonymous profile failed:', createErr.response?.data?.message || createErr.message);

                    // fall through

                }

                return null;

            }

            console.error('Error checking profile:', err.response?.data?.message || err.message);

            setError(err.response?.data?.message || 'Failed to check profile');

            return null;

        } finally {

            setIsLoading(false);

            profileCheckedRef.current = false;

        }

    }, [token]);


 

    // Initialize socket connection and check for existing profile

    useEffect(() => {

        if (user && token && !socket) {

            const init = async () => {

                // Ensure profile exists before socket auth

                if (!anonymousUser) {

                    try {

                        await checkExistingProfile();

                    } catch (e) {

                        // ignore here; UI may create via POST later

                    }

                }

                const newSocket = io('http://localhost:5001');


 

                newSocket.on('connect', () => {

                    console.log('Connected to socket server');

                    setIsConnected(true);

                    // Explicitly authenticate with backend socket service

                    if (token) {

                        newSocket.emit('authenticate', { token });

                    }

                });


 

                newSocket.on('disconnect', () => {

                    console.log('Disconnected from socket server');

                    setIsConnected(false);

                });


 

                newSocket.on('connect_error', (err) => {

                    console.error('Socket connect_error:', err.message);

                    setError('Realtime connection failed');

                });


 

                newSocket.on('authenticated', (data) => {

                    console.log('Socket authenticated:', data);

                });


 

                newSocket.on('new_message', (data) => {

                    console.log('New message received:', data);

                    // Only add message if it's for the current chat
                    // Use a function to get the current chat to avoid stale closure issues
                    setCurrentChat(currentChat => {
                        if (data.chatId === currentChat) {
                            setMessages(prev => {
                                // Check if message already exists to prevent duplicates
                                const messageExists = prev.some(msg => msg.id === data.message.id);
                                if (messageExists) {
                                    console.log('Message already exists, skipping duplicate');
                                    return prev;
                                }
                                console.log('Adding new message to chat:', data.chatId);
                                return [...prev, data.message];
                            });
                        } else {
                            console.log('Ignoring message for different chat:', data.chatId, 'current:', currentChat);
                        }
                        return currentChat; // Return unchanged currentChat
                    });

                });


 

                newSocket.on('user_typing', (data) => {

                    // Handle typing indicators if needed

                    console.log('User typing:', data);

                });

                newSocket.on('error', (data) => {

                    console.error('Socket error:', data);

                    setError(data.message || 'Socket connection error');

                });

                newSocket.on('authentication_error', (data) => {

                    console.error('Socket authentication error:', data);

                    setError(data.message || 'Authentication failed');

                });

                setSocket(newSocket);

                return () => {

                    // console.log('Closing socket connection with ID:', socketId);
                    newSocket.close();

                };

            };

            init();

        }

    }, [user, token, socket, checkExistingProfile]);


 

    // Check for existing profile when user and token are available

    useEffect(() => {

        console.log('Profile check useEffect - user:', !!user, 'token:', !!token, 'profileChecked:', profileCheckedRef.current);

        if (user && token && !profileCheckedRef.current) {

            console.log('Calling checkExistingProfile from useEffect');

            checkExistingProfile();

        }

    }, [user, token, checkExistingProfile]);


 

    // Create anonymous profile

    const createAnonymousProfile = useCallback(async (tags) => {

        try {

            setIsLoading(true);

            setError(null);
            console.log("here is the tags which need to be updated")

            const response = await axios.post('http://localhost:5001/api/anonymous/profile', { tags }, {

                headers: { Authorization: `Bearer ${token}` }

            });

            setAnonymousUser(response.data.anonymousUser);

            return response.data;

        } catch (err) {

            setError(err.response?.data?.message || 'Failed to create anonymous profile');

            throw err;

        } finally {

            setIsLoading(false);

        }

    }, [token]);


 

    // Search for users

    const searchUsers = useCallback(async (tags) => {

        try {

            setIsLoading(true);

            setError(null);

            let url = 'http://localhost:5001/api/anonymous/search';

            if (tags) {

                if (Array.isArray(tags)) {

                    // Multiple tags - join with comma

                    url += `?tag=${tags.join(',')}`;

                } else {

                    // Single tag

                    url += `?tag=${tags}`;

                }

            }

            const response = await axios.get(url, {

                headers: { Authorization: `Bearer ${token}` }

            });

            setAvailableUsers(response.data.users);

            return response.data;

        } catch (err) {

            setError(err.response?.data?.message || 'Failed to search users');

            throw err;

        } finally {

            setIsLoading(false);

        }

    }, [token]);


 

    // Get user chats

    const getUserChats = useCallback(async () => {

        try {

            setIsLoading(true);

            setError(null);

            const response = await axios.get('http://localhost:5001/api/anonymous/chats', {

                headers: { Authorization: `Bearer ${token}` }

            });

            setUserChats(response.data.chats);

            return response.data;

        } catch (err) {

            setError(err.response?.data?.message || 'Failed to get chats')

            throw err;

        } finally {

            setIsLoading(false);

        }


 

    }, [token]);

    // Get chat messages


 

    const getChatMessages = useCallback(async (chatId) => {

        // Prevent duplicate calls for the same chat

        if (loadingChatsRef.current.has(chatId)) {

            console.log('Already loading messages for chat:', chatId);

            return;

        }

        try {

            loadingChatsRef.current.add(chatId);

            setIsLoading(true);

            setError(null);


 

            console.log('Loading messages for chat:', chatId);


 

            const response = await axios.get(`http://localhost:5001/api/anonymous/chats/${chatId}/messages`, {

                headers: { Authorization: `Bearer ${token}` }

            });

            setMessages(response.data.messages);

            return response.data;

        } catch (err) {

            setError(err.response?.data?.message || 'Failed to get messages');

            throw err;

        } finally {

            setIsLoading(false);

            // Don't remove from loading set immediately - let it stay until next chat switch

        }

    }, [token]);


 

    // Send message

    const sendMessage = async (content, chatId) => {

        try {

            if (!socket) {

                throw new Error('Socket not connected');

            }


 

            const messageData = {

                content: content.trim(),

                chatId

            };

            socket.emit('send_message', messageData);

        } catch (err) {

            setError(err.message || 'Failed to send message');

            throw err;

        }

    };


 

    // Join a specific chat

    const joinChat = useCallback(async (chatId) => {

        try {

            console.log('joinChat called with chatId:', chatId, 'currentChat:', currentChat);

            // Don't join if already in the same chat


 

            if (currentChat === chatId) {

                console.log('Already in chat:', chatId);

                return;

            }

            // Prevent multiple simultaneous joins


 

            if (joiningChatRef.current === chatId) {

                console.log('Already joining chat:', chatId);

                return;

            }

            console.log('Joining chat:', chatId);

            joiningChatRef.current = chatId;

            // Clear loading set for previous chat

            loadingChatsRef.current.clear();

            setCurrentChat(chatId);

            // Clear previous messages immediately for better UX

            setMessages([]);

            // Join the socket room for real-time updates before fetching

            if (socket) {

                console.log('Emitting join_chat from joinChat function for chatId:', chatId);

                socket.emit('join_chat', { chatId });

            }

            await getChatMessages(chatId);

            console.log('Successfully joined chat:', chatId);

        } catch (err) {

            console.error('Error joining chat:', err);

            setError(err.message || 'Failed to join chat');

            throw err;

        } finally {

            joiningChatRef.current = null;

        }

    }, [socket, getChatMessages, currentChat]);


 

    // Connect with a user (defined after joinChat to avoid TDZ issues)

    const connectWithUser = useCallback(async (targetAnonId) => {

        try {

            console.log('connectWithUser called with targetAnonId:', targetAnonId);

            setIsLoading(true);

            setError(null);

            const response = await axios.post('http://localhost:5001/api/anonymous/connect', { targetAnonId }, {

                headers: { Authorization: `Bearer ${token}` }

            });

            console.log('Connect API response:', response.data);

            const chatId = response.data.chatId;

            // Use joinChat to properly set up the chat

            await joinChat(chatId);

            return response.data;

        } catch (err) {

            console.error('Error connecting with user:', err);

            setError(err.response?.data?.message || 'Failed to connect with user');

            throw err;

        } finally {

            setIsLoading(false);

        }

    }, [token, joinChat]);


 

    // Clear error

    const clearError = () => {

        setError(null);

    };


 

    // Reset state

    const resetState = () => {

        setAnonymousUser(null);

        setAvailableUsers([]);

        setUserChats([]);

        setCurrentChat(null);

        setMessages([]);

        setError(null);

    };


 

    const value = {

        // State

        socket,

        isConnected,

        anonymousUser,

        availableUsers,

        userChats,

        currentChat,

        messages,

        isLoading,

        error,


 

        // Actions

        checkExistingProfile,

        createAnonymousProfile,

        searchUsers,

        connectWithUser,

        getUserChats,

        getChatMessages,

        sendMessage,

        joinChat,

        clearError,

        resetState,

        setCurrentChat,

        setMessages,

        setAvailableUsers

    };

    return (

        <AnonymousContext.Provider value={value}>

            {children}

        </AnonymousContext.Provider>

    );

};

 

