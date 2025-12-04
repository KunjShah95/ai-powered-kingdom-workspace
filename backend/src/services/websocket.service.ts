import { Server, Socket } from 'socket.io';
import { io } from '../index';

export class WebSocketService {
    private static instance: WebSocketService;
    private io: Server;

    private constructor() {
        this.io = io;
        this.setupSocketEvents();
    }

    public static getInstance(): WebSocketService {
        if (!WebSocketService.instance) {
            WebSocketService.instance = new WebSocketService();
        }
        return WebSocketService.instance;
    }

    private setupSocketEvents(): void {
        this.io.on('connection', (socket: Socket) => {
            console.log(`Client connected: ${socket.id}`);

            socket.on('disconnect', () => {
                console.log(`Client disconnected: ${socket.id}`);
            });

            socket.on('subscribe:council', () => {
                socket.join('council');
            });

            socket.on('subscribe:events', () => {
                socket.join('events');
            });
        });
    }

    public broadcast(event: string, data: any, room?: string): void {
        if (room) {
            this.io.to(room).emit(event, data);
        } else {
            this.io.emit(event, data);
        }
    }
}
