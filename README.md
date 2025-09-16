# 🧠 MindMingle - Anonymous Peer Support & Mental Wellness Platform

[![React](https://img.shields.io/badge/React-18.0-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-16.0-green.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-5.0-green.svg)](https://mongodb.com/)
[![Socket.io](https://img.shields.io/badge/Socket.io-4.0-black.svg)](https://socket.io/)

## 🌟 Project Overview

**MindMingle** is a comprehensive mental wellness platform designed to empower users on their mindfulness journey. It offers a unique blend of mood tracking, goal setting, and a real-time anonymous peer support system, fostering a safe and supportive community. The platform aims to help users understand their emotional patterns, set and achieve personal wellness goals, and connect with others facing similar challenges in a private and secure environment.

![MindMingle Homepage](https://via.placeholder.com/800x400/4A90E2/FFFFFF?text=MindMingle+Homepage)
*Welcome to MindMingle - Your personal companion for mindfulness, mood management, and peer support*

## ✨ Key Features

### 🏠 **Landing Page & Navigation**
- Clean, modern homepage with feature highlights
- Intuitive navigation with user authentication
- Responsive design for all devices

### 😊 **Mood Tracking System**
- **Daily Mood Logging**: Select from 8 different mood states (Very Happy, Happy, Neutral, Sad, Very Sad, Anxious, Angry, Calm)
- **Intensity Slider**: Rate mood intensity from 1-10
- **Optional Notes**: Add context about what's contributing to your mood
- **Visual Analytics**: Track mood trends over time with interactive graphs
- **Mood History**: View recent mood entries in an organized card layout

![Mood Tracker Interface](https://via.placeholder.com/800x500/2ECC71/FFFFFF?text=Mood+Tracker+Interface)
*The Mood Tracker allows users to log their daily mood with intensity levels and optional notes*

![Mood History Dashboard](https://via.placeholder.com/800x500/9B59B6/FFFFFF?text=Mood+History+Dashboard)
*Visual mood trends and recent mood entries help users understand their emotional patterns*

### 🎯 **Goal Management System**
- **Create Goals**: Set personal wellness and life goals
- **Progress Tracking**: Mark goals as complete with visual feedback
- **Smart Filtering**: Filter between "Pending" and "Completed" goals
- **Modern UI**: Clean, intuitive interface with gradient styling

### 🤝 **Anonymous Peer Support (Core Feature)**
- **Anonymous Profiles**: Create profiles with unique IDs (e.g., "CalmSoul123", "WiseHeart456")
- **Tag-Based Matching**: Connect based on shared experiences (stress, anxiety, depression, etc.)
- **Real-time Chat**: Instant messaging powered by Socket.io
- **Privacy Protection**: Complete anonymity - no personal information shared
- **Smart Discovery**: Find users with similar challenges and interests
- **Chat Management**: Join, leave, and switch between multiple conversations

![Anonymous Profile Creation](https://via.placeholder.com/800x500/E74C3C/FFFFFF?text=Anonymous+Profile+Creation)
*Create your anonymous profile by selecting topics you'd like to discuss*

![Peer Support Interface](https://via.placeholder.com/800x500/3498DB/FFFFFF?text=Peer+Support+Interface)
*Find and connect with peers based on shared experiences and interests*

![Real-time Chat](https://via.placeholder.com/800x500/2ECC71/FFFFFF?text=Real-time+Chat)
*Engage in real-time anonymous conversations with matched peers*

### 🏃‍♂️ **Exercise & Wellness**
- Guided mindfulness exercises
- Step-by-step instructions with timers
- Progress tracking and completion status

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern UI framework with hooks and context
- **React Router** - Client-side routing and navigation
- **Socket.io Client** - Real-time communication
- **Axios** - HTTP client for API requests
- **Bootstrap 5** - Responsive UI framework
- **Context API** - State management (AuthContext, AnonymousContext)

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **Socket.io Server** - Real-time communication server
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Token authentication
- **Bcrypt** - Password hashing

### Database Schema
- **User Collection** - Real user accounts and authentication
- **AnonymousUser Collection** - Anonymous profiles for peer support
- **Chat Collection** - Chat rooms and participant management
- **Message Collection** - Real-time message storage
- **Goal Collection** - User goal tracking
- **MoodEntry Collection** - Mood logging and analytics

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or MongoDB Atlas)
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/mindmingle.git
cd mindmingle
```

2. **Backend Setup**
```bash
cd backend
npm install

# Create .env file
echo "MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000" > .env

npm start
```

3. **Frontend Setup**
```bash
cd ../frontend
npm install

# Create .env file
echo "REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_SOCKET_URL=http://localhost:5000" > .env

npm start
```

4. **Access the Application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 📱 Usage Guide

### Getting Started
1. **Register/Login** - Create your account or sign in
2. **Dashboard** - Access all features from the main dashboard
3. **Mood Tracking** - Log your daily mood and view trends
4. **Set Goals** - Create and track personal wellness goals
5. **Peer Support** - Create anonymous profile and connect with others

### Anonymous Peer Support
1. **Create Profile** - Select topics you'd like to discuss
2. **Find Peers** - Search for users with similar interests
3. **Start Chatting** - Connect and begin anonymous conversations
4. **Stay Anonymous** - Your real identity is never revealed

## 🔒 Security & Privacy

- **JWT Authentication** - Secure user authentication
- **Password Hashing** - Bcrypt encryption for passwords
- **Anonymous Communication** - No personal data in peer chats
- **Message Filtering** - Content moderation and bad word filtering
- **CORS Protection** - Cross-origin request security
- **Input Validation** - Comprehensive data sanitization

## 🏗️ Architecture

### Real-time Communication
- **Socket.io Implementation** - Bidirectional real-time messaging
- **Room-based Chats** - Isolated conversation spaces
- **Connection Management** - Automatic reconnection and status tracking
- **Message Persistence** - Database storage with real-time delivery

### Database Design
- **User Management** - Separate real and anonymous identities
- **Chat System** - Room-based messaging with participant tracking
- **Goal Tracking** - CRUD operations with status management
- **Mood Analytics** - Time-series data for trend analysis

## 📊 API Endpoints

### Authentication
```
POST /api/auth/register    - User registration
POST /api/auth/login       - User login
POST /api/auth/logout      - User logout
```

### Anonymous Support
```
GET  /api/anonymous/profile     - Get anonymous profile
POST /api/anonymous/profile     - Create/update profile
GET  /api/anonymous/search      - Search for peers
POST /api/anonymous/connect     - Connect with peer
GET  /api/anonymous/chats       - Get user chats
```

### Goals & Mood
```
GET    /api/goals           - Get user goals
POST   /api/goals           - Create new goal
PATCH  /api/goals/:id/toggle - Toggle goal completion
GET    /api/mood-entries    - Get mood history
POST   /api/mood-entries    - Log new mood
```

## 🎯 Key Features in Detail

### Anonymous Identity System
- **Generated IDs**: Creative anonymous names (CalmSoul123, WiseHeart456)
- **Tag Selection**: Choose from 10 predefined topics
- **Privacy Protection**: No real identity exposure in chats
- **Smart Matching**: Algorithm-based peer discovery

### Real-time Messaging
- **Instant Delivery**: Socket.io for real-time communication
- **Message History**: Persistent chat storage
- **Typing Indicators**: Real-time user activity
- **Online Status**: Live presence tracking

### Mood Analytics
- **Visual Trends**: Interactive mood graphs
- **Pattern Recognition**: Identify emotional patterns
- **Historical Data**: Track mood over time
- **Intensity Tracking**: Detailed mood intensity logging

## 🚀 Performance & Scalability

- **Real-time Performance**: < 100ms message delivery
- **Database Optimization**: Indexed queries and aggregation pipelines
- **Connection Management**: Efficient socket connection handling
- **Responsive Design**: Mobile-first approach
- **Error Handling**: Comprehensive error management

## 🤝 Contributing

We welcome contributions! Please feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Dhruv Rawat** - Full Stack Developer
- **Project Type** - Personal Portfolio Project
- **Duration** - [Project Timeline]

## 🔮 Future Enhancements

- [ ] AI-powered mood analysis
- [ ] Group chat support
- [ ] Mobile app development
- [ ] Advanced analytics dashboard
- [ ] Integration with wearable devices
- [ ] Professional counselor matching

## 📞 Contact

- **GitHub**: [Your GitHub Profile]
- **LinkedIn**: [Your LinkedIn Profile]
- **Email**: [Your Email]

---

**Built with ❤️ for mental health support and community building**

*Ready for technical presentations, interviews, and portfolio demonstrations!*
