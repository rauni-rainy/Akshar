import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import { PrismaClient } from '../generated/prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool as any);
const prisma = new PrismaClient({ adapter });

export const getNotifications = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }

        const notifications = await prisma.notification.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            take: 50
        });

        res.status(200).json(notifications);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const markAsRead = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user?.userId;
        const id = req.params.id as string;
        if (!userId) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }

        await prisma.notification.update({
            where: { id },
            data: { isRead: true }
        });

        res.status(200).json({ success: true });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const markAllAsRead = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }

        await prisma.notification.updateMany({
            where: { userId, isRead: false },
            data: { isRead: true }
        });

        res.status(200).json({ success: true });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
