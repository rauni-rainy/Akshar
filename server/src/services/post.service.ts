import { PrismaClient } from '../generated/prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool as any);
const prisma = new PrismaClient({ adapter });

export const createPostService = async (authorId: string, title: string, content: string, type: string, published: boolean, prompt?: string, tags?: string[]) => {
    return await prisma.post.create({
        data: {
            title,
            content,
            type,
            published,
            authorId,
            prompt,
            tags: tags || []
        }
    });
};

export const getAllPublishedPosts = async () => {
    return await prisma.post.findMany({
        where: { published: true },
        include: {
            author: { select: { id: true, displayName: true, realName: true, avatar: true, country: true } },
            likes: { select: { userId: true } }
        },
        orderBy: { createdAt: 'desc' }
    });
};

export const getPostByIdService = async (postId: string) => {
    const post = await prisma.post.findUnique({
        where: { id: postId },
        include: {
            author: { select: { id: true, displayName: true, realName: true, avatar: true, country: true } },
            likes: { select: { userId: true } }
        }
    });
    if (!post) throw new Error("Post not found");
    return post;
};

export const deletePostService = async (postId: string, authorId: string) => {
    // Ensure the post belongs to the person trying to delete it!
    const post = await prisma.post.findUnique({ where: { id: postId } });
    if (!post) throw new Error("Post not found");
    if (post.authorId !== authorId) throw new Error("Unauthorized to delete this post");

    await prisma.post.delete({ where: { id: postId } });
    return true;
};

export const toggleLikeService = async (userId: string, postId: string) => {
    const existingLike = await prisma.like.findUnique({
        where: { userId_postId: { userId, postId } }
    });

    if (existingLike) {
        await prisma.like.delete({ where: { id: existingLike.id } });
        return { liked: false };
    } else {
        await prisma.like.create({ data: { userId, postId } });
        return { liked: true };
    }
};
