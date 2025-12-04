import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class CouncilController {
    static async getAll(req: Request, res: Response) {
        try {
            const members = await prisma.councilMember.findMany();
            res.json(members);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch council members' });
        }
    }

    static async create(req: Request, res: Response) {
        try {
            const member = await prisma.councilMember.create({
                data: req.body
            });
            res.json(member);
        } catch (error) {
            res.status(500).json({ error: 'Failed to create council member' });
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const member = await prisma.councilMember.update({
                where: { id },
                data: req.body
            });
            res.json(member);
        } catch (error) {
            res.status(500).json({ error: 'Failed to update council member' });
        }
    }
}
