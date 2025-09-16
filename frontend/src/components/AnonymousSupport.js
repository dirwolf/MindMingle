import React, { useState, useEffect, useRef, useCallback } from "react";

import { useSearchParams } from "react-router-dom";

import { useAnonymous } from "../context/AnonymousContext";

import { useAuth } from "../context/AuthContext";



 

const AnonymousSupport = () => {

    const { user } = useAuth();

    const [searchParams, setSearchParams] = useSearchParams();

    const {

        anonymousUser,

        // isConnected, // no longer used to block input

        availableUsers,

        userChats,

        currentChat,

        messages,

        isLoading,

        error,

        createAnonymousProfile,

        searchUsers,

        connectWithUser,

        getUserChats,

        sendMessage,

        joinChat,

        setCurrentChat,

        clearError,

    } = useAnonymous();


 

    const [selectedTags, setSelectedTags] = useState([]);

    const [newMessage, setNewMessage] = useState("");

    const [showProfileSetup, setShowProfileSetup] = useState(false);

    const [activeTab, setActiveTab] = useState("search"); // 'search', 'chats'

    const isProcessingRef = useRef(false);

    const isSwitchingChatRef = useRef(false);

    const messagesEndRef = useRef(null);

    const lastOpenedChatRef = useRef(null);


 

    // Get chat ID from URL parameters

    const chatIdFromUrl = searchParams.get("chat");

    const availableTags = ["stress","anxiety","depression","productivity","relationships","work","health","family","school","general",];

    // Toggle profile setup based on anonymous user presence


 

    useEffect(() => {

        console.log("Profile check - user:",!!user,"anonymousUser:",!!anonymousUser,"isLoading:",isLoading

        );

        if (!user) return;

        if (isLoading) return;

        setShowProfileSetup(!anonymousUser);

    }, [user, anonymousUser, isLoading]);


 

    // Optimized chat switching function

    const switchToChat = useCallback(

        async (chatId) => {

            if (isSwitchingChatRef.current || currentChat === chatId) {

                return; // Prevent multiple simultaneous switches or switching to same chat

            }

            try {

                isSwitchingChatRef.current = true;

                await joinChat(chatId);

                setSearchParams({ chat: chatId });

                localStorage.setItem("currentChatId", chatId);

            } catch (error) {

                console.error("Failed to switch chat:", error);

            } finally {

                isSwitchingChatRef.current = false;

            }

        },

        [joinChat, currentChat, setSearchParams]

    );

    // Load user chats when component mounts

    useEffect(() => {

        const loadData = async () => {

            if (anonymousUser) {

                await getUserChats();

            }

        };

        loadData();

    }, [anonymousUser, getUserChats]);



 

    // Restore chat state from URL or localStorage on page load

    useEffect(() => {

        const restoreChatState = async () => {

            if (isProcessingRef.current) return; // Prevent multiple simultaneous executions


 

            if (anonymousUser && userChats.length > 0) {

                isProcessingRef.current = true;

                try {

                    // Priority 1: Check URL parameter

                    if (chatIdFromUrl) {

                        const chatExists = userChats.find(

                            (chat) => chat.chatId === chatIdFromUrl

                        );

                        if (chatExists) {

                            setActiveTab("chats");

                            await switchToChat(chatIdFromUrl);

                            return;

                        } else {

                            // Chat doesn't exist, clear the URL parameter

                            setSearchParams({});

                            return;

                        }

                    }

                    // Priority 2: Check localStorage

                    const savedChatId = localStorage.getItem("currentChatId");

                    if (savedChatId) {

                        const chatExists = userChats.find(

                            (chat) => chat.chatId === savedChatId

                        );

                        if (chatExists) {

                            setActiveTab("chats");

                            await switchToChat(savedChatId);

                            return;

                        } else {

                            // Chat doesn't exist, clear localStorage

                            localStorage.removeItem("currentChatId");

                        }

                    }

                } finally {

                    isProcessingRef.current = false;

                }

            }

        };

        restoreChatState();

    }, [anonymousUser, userChats, chatIdFromUrl, switchToChat, setSearchParams]);


 

    // Load messages when chat is selected (removed - handled by joinChat)

    // This useEffect was causing duplicate API calls since joinChat already calls getChatMessages

    // Connections feature removed

    // When currentChat changes, ensure Chats tab is active and URL/localStorage are updated once

    useEffect(() => {

        if (currentChat && lastOpenedChatRef.current !== currentChat) {

            setActiveTab("chats");

            setSearchParams({ chat: currentChat });

            localStorage.setItem("currentChatId", currentChat);

            lastOpenedChatRef.current = currentChat;

        }

    }, [currentChat, setSearchParams]);


 

    const handleTagToggle = (tag) => {

        setSelectedTags((prev) =>

            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]

        );

    };


 

    const handleCreateProfile = async () => {

        try {
            console.log("HandleCreateProfile method is called : ^^^^");
            selectedTags.forEach(item=>console.log(item));
            await createAnonymousProfile(selectedTags);

            setShowProfileSetup(false);
            
        } catch (error) {

            console.error("Failed to create profile:", error);

        }

    };


 

    const handleSearch = async () => {

        try {

            // Use selected tags for search, or search all if none selected

            const searchTags = selectedTags.length > 0 ? selectedTags : null;

            await searchUsers(searchTags);

        } catch (error) {

            console.error("Failed to search users:", error);

        }

    };


 

    const handleConnect = async (targetAnonId) => {

        try {

            console.log("Starting connection with user:", targetAnonId);


 

            // Connect with the user (this will set currentChat and load messages)

            const result = await connectWithUser(targetAnonId);

            console.log("Connect result:", result);

            const chatId = result?.chatId;


 

            if (!chatId) {

                console.error("No chatId returned from connectWithUser");

                return;

            }

            console.log("Got chatId:", chatId);

            // Switch to chats tab

            setActiveTab("chats");

            // Refresh the chat list to include the new chat

            await getUserChats();

            // Update URL and localStorage

            setSearchParams({ chat: chatId });

            localStorage.setItem("currentChatId", chatId);

            console.log("Successfully connected and joined chat:", chatId);

        } catch (error) {

            console.error("Failed to start chat:", error);

            // Error will be set by the context, just clear any previous errors

            clearError();

        }

    };


 

    // Removed handleConnectionClick as connections feature has been deprecated

    const handleSendMessage = (e) => {

        e.preventDefault();

        if (newMessage.trim() && currentChat) {

            sendMessage(newMessage, currentChat);

            setNewMessage("");

        }

    };

    // Function to clear chat state


    const handleUpdateProfile = ()=>{
        console.log("HandleUpdate profile method called")
        if(anonymousUser && anonymousUser.tags){
            setSelectedTags(anonymousUser.tags);
        }
        setShowProfileSetup(true); //shows the prpfile setup modal
    }

    const clearChatState = () => {

        setCurrentChat(null);

        setSearchParams({});

        localStorage.removeItem("currentChatId");

    };


 

    // Auto-scroll to bottom on new messages or when switching chats

    useEffect(() => {

        if (messagesEndRef.current) {

            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });

        }

    }, [messages, currentChat]);


 

    if (showProfileSetup) {

        return (

            <div

                className="container mt-5"

                style={{ minHeight: "calc(100vh - 80px)", paddingTop: "80px" }}

            >

                <div className="row justify-content-center">

                    <div className="col-md-8 col-lg-6">

                        <div className="card shadow">

                            <div className="card-header bg-primary text-white">

                                <h4 className="mb-0">Create Anonymous Profile</h4>

                            </div>

                            <div className="card-body">

                                <p className="text-muted">

                                    Create your anonymous profile to connect with others who share

                                    similar experiences. Your real identity will never be

                                    revealed.

                                </p>

                                <div className="mb-4">

                                    <label className="form-label">

                                        Select topics you'd like to discuss:

                                    </label>

                                    <div className="d-flex flex-wrap gap-2">

                                        {availableTags.map((tag) => (

                                            <button

                                                key={tag}

                                                type="button"

                                                className={`btn btn-sm ${selectedTags.includes(tag)

                                                        ? "btn-primary"

                                                        : "btn-outline-primary"

                                                    }`}

                                                onClick={() => handleTagToggle(tag)}

                                            >

                                                {tag}

                                            </button>

                                        ))}

                                    </div>

                                </div>

                                <div className="d-grid">

                                    <button

                                        className="btn btn-primary"

                                        onClick={handleCreateProfile}

                                        disabled={isLoading}

                                    >

                                        {isLoading ? "Creating..." : "Create Anonymous Profile"}

                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        );

    }

    if (!anonymousUser) {

        return (

            <div

                className="container mt-5"

                style={{ minHeight: "calc(100vh - 80px)", paddingTop: "80px" }}

            >

                <div className="row justify-content-center">

                    <div className="col-md-6">

                        <div className="card shadow">

                            <div className="card-body text-center">

                                <h4>Anonymous Support</h4>

                                <p className="text-muted">Loading your anonymous profile...</p>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        );

    }


 

    return (

        <div

            className="container-fluid mt-3"

            style={{ minHeight: "calc(100vh - 80px)", paddingTop: "80px" }}

        >

            <div className="row">

                <div className="col-12">

                    <div className="card shadow">

                        <div className="card-header bg-primary text-white">

                            <div className="d-flex justify-content-between align-items-center">

                                <h4 className="mb-0">Anonymous Peer Support</h4>

                                <div className="d-flex align-items-center gap-3">

                                    <span className="badge bg-light text-dark">

                                        Your ID: {anonymousUser.anonId}

                                    </span>
                                    <button className="btn btn-sm btn-outline-light" onClick={handleUpdateProfile} title="Update your topics">
                                    <i className="fas fa-edit me-1"></i>
                                    Update Topics
                                    </button>
                                </div>

                            </div>

                        </div>



 

                        <div className="card-body p-0">

                            <div className="row g-0">

                                {/* Left Sidebar */}

                                <div className="col-md-4 border-end">

                                    <div className="p-3">

                                        <ul className="nav nav-tabs" role="tablist">

                                            <li className="nav-item">

                                                <button

                                                    className={`nav-link ${activeTab === "search" ? "active" : ""

                                                        }`}

                                                    onClick={() => setActiveTab("search")}

                                                >

                                                    Find Support

                                                </button>

                                            </li>

                                            <li className="nav-item">

                                                <button

                                                    className={`nav-link ${activeTab === "chats" ? "active" : ""

                                                        }`}

                                                    onClick={() => setActiveTab("chats")}

                                                >

                                                    My Chats ({userChats.length})

                                                </button>

                                            </li>

                                        </ul>



 

                                        <div className="tab-content mt-3">

                                            {activeTab === "search" && (

                                                <div>

                                                    <div className="mb-3">

                                                        <label className="form-label">

                                                            Search by topics (select multiple):

                                                        </label>

                                                        <div className="d-flex flex-wrap gap-2">

                                                            {availableTags.map((tag) => (

                                                                <div key={tag} className="form-check">

                                                                    <input

                                                                        className="form-check-input"

                                                                        type="checkbox"

                                                                        id={`tag-${tag}`}

                                                                        checked={selectedTags.includes(tag)}

                                                                        onChange={() => handleTagToggle(tag)}

                                                                    />

                                                                    <label

                                                                        className="form-check-label"

                                                                        htmlFor={`tag-${tag}`}

                                                                    >

                                                                        {tag}

                                                                    </label>

                                                                </div>

                                                            ))}

                                                        </div>

                                                        {selectedTags.length > 0 && (

                                                            <div className="mt-2">

                                                                <small className="text-muted">

                                                                    Selected: {selectedTags.join(", ")}

                                                                </small>

                                                            </div>

                                                        )}

                                                    </div>


 

                                                    <button

                                                        className="btn btn-primary w-100 mb-3"

                                                        onClick={handleSearch}

                                                        disabled={isLoading}

                                                    >

                                                        {isLoading

                                                            ? "Searching..."

                                                            : selectedTags.length > 0

                                                                ? `Search for ${selectedTags.length} topic${selectedTags.length > 1 ? "s" : ""

                                                                }`

                                                                : "Search All Users"}

                                                    </button>


 

                                                    {error && (

                                                        <div className="alert alert-danger">{error}</div>

                                                    )}


 

                                                    <div className="list-group">

                                                        {availableUsers.map((user) => (

                                                            <div

                                                                key={user.anonId}

                                                                className="list-group-item"

                                                            >

                                                                <div className="d-flex justify-content-between align-items-start">

                                                                    <div>

                                                                        <h6 className="mb-1">{user.anonId}</h6>

                                                                        <div className="d-flex flex-wrap gap-1 mb-2">

                                                                            {user.tags.map((tag) => (

                                                                                <span

                                                                                    key={tag}

                                                                                    className="badge bg-secondary"

                                                                                >

                                                                                    {tag}

                                                                                </span>

                                                                            ))}

                                                                        </div>

                                                                        <small className="text-muted">

                                                                            Status: {user.status} | Last seen:{" "}

                                                                            {new Date(user.lastSeen).toLocaleString()}

                                                                        </small>

                                                                    </div>

                                                                    <div className="btn-group-vertical btn-group-sm">

                                                                        <button

                                                                            className="btn btn-sm btn-outline-primary"

                                                                            onClick={() => handleConnect(user.anonId)}

                                                                            disabled={isLoading}

                                                                        >

                                                                            Message

                                                                        </button>

                                                                    </div>

                                                                </div>

                                                            </div>

                                                        ))}

                                                    </div>

                                                </div>

                                            )}


 

                                            {activeTab === "chats" && (

                                                <div>

                                                    <div className="list-group">

                                                        {userChats.map((chat) => (

                                                            <button

                                                                key={chat.chatId}

                                                                className={`list-group-item list-group-item-action ${currentChat === chat.chatId ? "active" : ""

                                                                    }`}

                                                                onClick={() => switchToChat(chat.chatId)}

                                                            >

                                                                <div className="d-flex justify-content-between">

                                                                    <div>

                                                                        <h6 className="mb-1">

                                                                            {chat.participants.find(

                                                                                (p) => p !== anonymousUser.anonId

                                                                            )}

                                                                        </h6>

                                                                        <small>{chat.messageCount} messages</small>

                                                                    </div>

                                                                    <small>

                                                                        {new Date(

                                                                            chat.lastMessage

                                                                        ).toLocaleDateString()}

                                                                    </small>

                                                                </div>

                                                            </button>

                                                        ))}

                                                    </div>

                                                </div>

                                            )}

                                        </div>

                                    </div>

                                </div>


 

                                {/* Chat Area */}

                                <div className="col-md-8">

                                    {currentChat ? (

                                        <div

                                            className="d-flex flex-column"

                                            style={{ height: "500px" }}

                                        >

                                            {/* Chat Header */}

                                            <div className="p-3 border-bottom bg-light">

                                                <div className="d-flex justify-content-between align-items-center">

                                                    <div className="d-flex align-items-center">

                                                        <button

                                                            className="btn btn-link p-0 me-2 d-lg-none"

                                                            onClick={clearChatState}

                                                            title="Back to chats"

                                                        >

                                                            <i className="fas fa-arrow-left"></i>

                                                        </button>

                                                        <h6 className="mb-0">

                                                            Chat with{" "}

                                                            {userChats

                                                                .find((c) => c.chatId === currentChat)

                                                                ?.participants.find(

                                                                    (p) => p !== anonymousUser.anonId

                                                                )}

                                                        </h6>

                                                    </div>

                                                    <button

                                                        className="btn btn-link p-0 text-muted"

                                                        onClick={clearChatState}

                                                        title="Close chat"

                                                    >

                                                        <i className="fas fa-times"></i>

                                                    </button>

                                                </div>

                                            </div>


 

                                            {/* Messages */}

                                            <div

                                                className="flex-grow-1 p-3 overflow-auto"

                                                style={{ maxHeight: "350px" }}

                                            >

                                                {messages.map((message, index) => (

                                                    <div

                                                        key={message.id || message._id || index}

                                                        className={`mb-2 ${message.senderAnonId === anonymousUser.anonId

                                                                ? "text-end"

                                                                : "text-start"

                                                            }`}

                                                    >

                                                        <div

                                                            className={`d-inline-block p-2 rounded ${message.senderAnonId === anonymousUser.anonId

                                                                    ? "bg-primary text-white"

                                                                    : "bg-light"

                                                                }`}

                                                        >

                                                            <div className="small text-muted mb-1">

                                                                {message.senderAnonId === anonymousUser.anonId

                                                                    ? "You"

                                                                    : message.senderAnonId}

                                                            </div>

                                                            <div>{message.content}</div>

                                                            <div className="small text-muted mt-1">

                                                                {new Date(

                                                                    message.timestamp || message.createdAt

                                                                ).toLocaleTimeString()}

                                                            </div>

                                                        </div>

                                                    </div>

                                                ))}

                                                <div ref={messagesEndRef} />

                                            </div>

                                            {/* Message Input */}

                                            <div className="p-3 border-top">

                                                <form onSubmit={handleSendMessage}>

                                                    <div className="input-group">

                                                        <input

                                                            type="text"

                                                            className="form-control"

                                                            placeholder="Type your message..."

                                                            value={newMessage}

                                                            onChange={(e) => setNewMessage(e.target.value)}

                                                            disabled={!currentChat}

                                                        />

                                                        <button

                                                            className="btn btn-primary"

                                                            type="submit"

                                                            disabled={!currentChat || !newMessage.trim()}

                                                        >

                                                            Send

                                                        </button>

                                                    </div>

                                                </form>

                                            </div>

                                        </div>

                                    ) : (

                                        <div className="d-flex align-items-center justify-content-center h-100 p-5">

                                            <div className="text-center text-muted">

                                                <h5>Select a chat to start messaging</h5>

                                                <p>

                                                    Choose from your existing chats or find new people to

                                                    message.

                                                </p>

                                                <button

                                                    className="btn btn-primary mt-3"

                                                    onClick={() => setActiveTab("chats")}

                                                >

                                                    <i className="fas fa-comments me-2"></i>

                                                    View My Chats

                                                </button>

                                            </div>

                                        </div>

                                    )}

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

};


 

export default AnonymousSupport;




 