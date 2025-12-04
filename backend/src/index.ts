import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: process.env.FRONTEND_URL || "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});

import aiRoutes from './routes/ai.routes';
import fileRoutes from './routes/file.routes';
import councilRoutes from './routes/council.routes';
import eventsRoutes from './routes/events.routes';
import { FileWatcherService } from './services/file-watcher.service';
import path from 'path';

app.use(cors());
app.use(express.json());

// Initialize Services
const watchDir = path.resolve(__dirname, '../../'); // Watch project root
new FileWatcherService(watchDir);

import authRoutes from './routes/auth.routes';

// ...

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/files', fileRoutes);
app.use('/api/council', councilRoutes);
app.use('/api/events', eventsRoutes);

// Basic health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 3001;

httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

export { io };
