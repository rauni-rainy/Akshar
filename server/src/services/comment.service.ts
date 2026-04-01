import { PrismaClient } from '../generated/prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool as any);
const prisma = new PrismaClient({ adapter });

export const addComment = async (authorId: string, postId: string, content: string, parentId?: string) => {
    // 1. Verify the post exists
    const post = await prisma.post.findUnique({ where: { id: postId } });
    if (!post) throw new Error("Post not found");
    
    // 2. Author constraints
    if (!parentId && post.authorId === authorId) {
        throw new Error("Authors cannot create top-level comments on their own operations.");
    }

    if (parentId) {
        let currentParentId: string | null = parentId;
        let depth = 0;
        let threadOwnerId = "";
        while (currentParentId) {
            const node: any = await prisma.comment.findUnique({ where: { id: currentParentId as string } });
            if (!node) throw new Error("Broken comment thread");
            if (!node.parentId) threadOwnerId = node.authorId;
            currentParentId = node.parentId;
            depth++;
            if (depth > 5) break; 
        }

        const isAuthorTurn = depth % 2 === 1; // if parent is depth 0 (Inspector), depth is 1, so it's Author's turn. 
        if (isAuthorTurn && authorId !== post.authorId) {
             throw new Error("Only the author can formulate a reply at this depth.");
        }
        if (!isAuthorTurn && authorId !== threadOwnerId) {
             throw new Error("Only the original inspector can reply here.");
        }
        if (depth > 3) {
             throw new Error("Maximum conversation depth reached.");
        }
    }

    // 3. Create the comment
    return await prisma.comment.create({
        data: {
            content,
            postId,
            authorId,
            parentId: parentId || null
        },
        include: {
            author: { select: { id: true, displayName: true, realName: true, avatar: true } }
        }
    });
};

export const getCommentsForPost = async (postId: string) => {
    return await prisma.comment.findMany({
        where: { postId, parentId: null },
        include: {
            author: { select: { id: true, displayName: true, realName: true, avatar: true } },
            replies: {
                include: {
                    author: { select: { id: true, displayName: true, realName: true, avatar: true } },
                    replies: {
                        include: {
                            author: { select: { id: true, displayName: true, realName: true, avatar: true } },
                            replies: {
                                include: {
                                    author: { select: { id: true, displayName: true, realName: true, avatar: true } }
                                }
                            }
                        }
                    }
                }
            }
        },
        orderBy: { createdAt: 'desc' }
    });
};
