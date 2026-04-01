import { PrismaClient } from '../generated/prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool as any);
const prisma = new PrismaClient({ adapter });

export const addReview = async (authorId: string, postId: string, rating: number, observe: string, interrogate: string, elevate: string, creative: string, annotations: any) => {
    return await prisma.review.upsert({
        where: {
            authorId_postId: {
                authorId,
                postId
            }
        },
        update: {
            rating,
            observe,
            interrogate,
            elevate,
            creative,
            annotations
        },
        create: {
            authorId,
            postId,
            rating,
            observe,
            interrogate,
            elevate,
            creative,
            annotations
        },
        include: {
            author: { select: { id: true, displayName: true, avatar: true, country: true } }
        }
    });
};

export const getReviewsForPost = async (postId: string) => {
    return await prisma.review.findMany({
        where: { postId },
        include: {
            author: { select: { id: true, displayName: true, avatar: true, country: true } }
        },
        orderBy: { createdAt: 'desc' }
    });
};
