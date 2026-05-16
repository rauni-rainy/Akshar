import { Request, Response } from 'express';
import { addComment, getCommentsForPost } from '../services/comment.service';
import { AuthRequest } from '../middlewares/auth.middleware';

export const createComment = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { content, parentId } = req.body;
        const { postId } = req.params;
        const authorId = req.user?.userId;

        if (!authorId) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }

        if (!content) {
            res.status(400).json({ error: "Comment content is required" });
            return;
        }

        const comment = await addComment(authorId, postId as string, content, parentId);
        res.status(201).json({ message: "Comment added successfully", comment });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

export const fetchComments = async (req: Request, res: Response): Promise<void> => {
    try {
        const { postId } = req.params;
        const comments = await getCommentsForPost(postId as string);
        res.status(200).json(comments);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
