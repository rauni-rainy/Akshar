import { PrismaClient } from '../generated/prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool as any);
const prisma = new PrismaClient({ adapter });

export const addComment = async (authorId: string, postId: string, content: string) => {
    // 1. Verify the post exists
    const post = await prisma.post.findUnique({ where: { id: postId } });
    if (!post) throw new Error("Post not found");

    // 2. Create the comment
    return await prisma.comment.create({
        data: {
            content,
            postId,
            authorId
        },
        include: {
            author: { select: { displayName: true, realName: true, avatar: true } }
        }
    });
};

export const getCommentsForPost = async (postId: string) => {
    return await prisma.comment.findMany({
        where: { postId },
        include: {
            author: { select: { displayName: true, realName: true, avatar: true } }
        },
        orderBy: { createdAt: 'desc' }
    });
};
