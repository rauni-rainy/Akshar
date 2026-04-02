import { PrismaClient } from '../generated/prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool as any);
const prisma = new PrismaClient({ adapter });

export const createPostService = async (authorId: string, title: string, content: string, type: string, published: boolean, prompt?: string, tags?: string[], authorNote?: string) => {
    return await prisma.post.create({
        data: {
            title,
            content,
            type,
            published,
            authorId,
            prompt,
            tags: tags || [],
            authorNote
        }
    });
};

export const getAllPublishedPosts = async (page: number = 1, limit: number = 5) => {
    const skip = (page - 1) * limit;

    const [posts, total] = await Promise.all([
        prisma.post.findMany({
            where: { published: true },
            include: {
                author: { select: { id: true, displayName: true, realName: true, avatar: true, country: true } },
                likes: { select: { userId: true } },
                reviews: { select: { id: true } }
            },
            orderBy: { createdAt: 'desc' },
            skip,
            take: limit,
        }),
        prisma.post.count({ where: { published: true } })
    ]);

    const totalPages = Math.max(1, Math.ceil(total / limit));

    return { posts, total, page, totalPages, limit };
};

export const getPostByIdService = async (postId: string) => {
    const post = await prisma.post.findUnique({
        where: { id: postId },
        include: {
            author: { select: { id: true, displayName: true, realName: true, avatar: true, country: true } },
            likes: { select: { userId: true } },
            comments: { 
                where: { parentId: null },
                include: { 
                    author: { select: { id: true, displayName: true, avatar: true, country: true } },
                    replies: {
                        include: {
                            author: { select: { id: true, displayName: true, avatar: true, country: true } },
                            replies: {
                                include: {
                                    author: { select: { id: true, displayName: true, avatar: true, country: true } },
                                    replies: {
                                        include: {
                                            author: { select: { id: true, displayName: true, avatar: true, country: true } }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                orderBy: { createdAt: 'desc' }
            },
            reviews: {
                include: { author: { select: { id: true, displayName: true, avatar: true, country: true } } },
                orderBy: { createdAt: 'desc' }
            }
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
        
        const post = await prisma.post.findUnique({ where: { id: postId }, select: { authorId: true } });
        if (post && post.authorId !== userId) {
             const liker = await prisma.user.findUnique({ where: { id: userId }, select: { displayName: true } });
             await prisma.notification.create({
                 data: {
                     userId: post.authorId,
                     type: "LIKE",
                     message: `${liker?.displayName || 'An operative'} endorsed your transmission.`,
                     link: `/post/${postId}`
                 }
             });
        }

        return { liked: true };
    }
};

export const recordViewService = async (userId: string, postId: string) => {
    const post = await prisma.post.findUnique({ where: { id: postId } });
    if (!post) throw new Error("Post not found");
    if (post.authorId === userId) return; // Do not record if viewing own post
    
    // Check if view already exists
    const existingView = await prisma.view.findUnique({
        where: { userId_postId: { userId, postId } }
    });

    if (!existingView) {
        await prisma.view.create({ data: { userId, postId } });
    }
};

export const updatePostService = async (postId: string, authorId: string, title: string, content: string, type: string, published: boolean, prompt?: string, tags?: string[], authorNote?: string) => {
    const post = await prisma.post.findUnique({ where: { id: postId } });
    if (!post) throw new Error("Post not found");
    if (post.authorId !== authorId) throw new Error("Unauthorized to edit this post");

    return await prisma.post.update({
        where: { id: postId },
        data: {
            title,
            content,
            type,
            published,
            prompt,
            tags: tags || [],
            authorNote,
            // updatedAt is automatically updated by prisma @updatedAt, but we can rely on that.
        }
    });
};

export const getMyWritingsService = async (userId: string) => {
    const drafts = await prisma.post.findMany({
        where: { authorId: userId, published: false },
        orderBy: { updatedAt: 'desc' }
    });

    const published = await prisma.post.findMany({
        where: { authorId: userId, published: true },
        include: {
            author: { select: { id: true, displayName: true, realName: true, avatar: true, country: true } },
            likes: { select: { userId: true } },
            reviews: { select: { id: true } }
        },
        orderBy: { createdAt: 'desc' }
    });

    const reviewsWritten = await prisma.review.findMany({
        where: { authorId: userId },
        include: {
            post: { select: { id: true, title: true, type: true } }
        },
        orderBy: { createdAt: 'desc' }
    });

    const reviewsReceived = await prisma.review.findMany({
        where: { post: { authorId: userId } },
        include: {
            author: { select: { id: true, displayName: true, avatar: true } },
            post: { select: { id: true, title: true, type: true } }
        },
        orderBy: { createdAt: 'desc' }
    });

    return { drafts, published, reviewsWritten, reviewsReceived };
};
