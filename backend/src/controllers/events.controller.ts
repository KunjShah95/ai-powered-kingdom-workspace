import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { WebSocketService } from '../services/websocket.service';

const prisma = new PrismaClient();

export class EventsController {
    static async getAll(req: Request, res: Response) {
        try {
            const events = await prisma.kingdomEvent.findMany({
                orderBy: { timestamp: 'desc' }
            });
            res.json(events);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch events' });
        }
    }

    static async create(req: Request, res: Response) {
        try {
            const event = await prisma.kingdomEvent.create({
                data: req.body
            });

            // Broadcast event
            WebSocketService.getInstance().broadcast('event:new', event);

            res.json(event);
        } catch (error) {
            res.status(500).json({ error: 'Failed to create event' });
        }
    }
}
