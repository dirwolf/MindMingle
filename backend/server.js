import express from "express";

import cors from "cors";

import jwt from 'jsonwebtoken';

import http from 'http'

import bd from "body-parser";

import connectDB from "./utilities/db.js";

import userRoutes from "./routes/user.js";

import reminderRoutes from "./routes/reminder.js";

import moodRoutes from "./routes/moodentry.js";

import exerciseRoutes from "./routes/exercise.js";

import anonymousRoutes from "./routes/anonymous.js";

import goalRoutes from "./routes/goal.js";

import { initializeSocket } from "./services/socketService.js";


 

import dotenv from "dotenv";

import { Socket } from "socket.io";

dotenv.config();

const app = express();

const server = http.createServer(app);

const PORT = process.env.PORT || 5001;

app.use(cors({

  origin: "http://localhost:3000",

  credentials: true

}));

app.use(bd.json());

connectDB();

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

app.use("/api", exerciseRoutes);

app.use("/api/auth", userRoutes);

app.use("/api", reminderRoutes);

app.use("/api", moodRoutes);

app.use('/api',goalRoutes);

app.use("/api/anonymous",anonymousRoutes);

app.get('/api/health', (req, res) => {

  res.json({ status: 'OK', message: 'MindMingle API is running' });

});


 

const io = initializeSocket(server);

// console.log("io server initiated : ",io);

io.on("connection : ",(Socket))

server.listen(PORT, () => {

  console.log(`MindMingle server running on port ${PORT}`);

  console.log(`Health check: http://localhost:${PORT}/api/health`);

});


 

export default app;



 