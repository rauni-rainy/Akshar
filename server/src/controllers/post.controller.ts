import { Request, Response } from 'express';
import { createPostService, getAllPublishedPosts, getPostByIdService, deletePostService, toggleLikeService, recordViewService, updatePostService, getMyWritingsService } from '../services/post.service';
import { AuthRequest } from '../middlewares/auth.middleware';

export const createPost = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { title, content, type, published, prompt, tags, authorNote } = req.body;
        const authorId = req.user?.userId;

        if (!authorId) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }

        if (!title || !content || !type) {
            res.status(400).json({ error: "Title, content, and type are required" });
            return;
        }

        const post = await createPostService(authorId, title, content, type, published ?? false, prompt, tags, authorNote);
        res.status(201).json({ message: "Post created successfully", post });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getFeeds = async (req: Request, res: Response): Promise<void> => {
    try {
        const page = Math.max(1, parseInt(req.query.page as string) || 1);
        const limit = Math.max(1, Math.min(20, parseInt(req.query.limit as string) || 5));
        const result = await getAllPublishedPosts(page, limit);
        res.status(200).json(result);
    } catch (error: any) {
        res.status(500).json({ error: "Failed to fetch feeds" });
    }
};

export const getPostById = async (req: Request, res: Response): Promise<void> => {
    try {
        const post = await getPostByIdService(req.params.id as string);
        res.status(200).json(post);
    } catch (error: any) {
        res.status(404).json({ error: error.message });
    }
};

export const deletePost = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const authorId = req.user?.userId;
        if (!authorId) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }

        await deletePostService(req.params.id as string, authorId);
        res.status(200).json({ message: "Post deleted successfully" });
    } catch (error: any) {
        res.status(403).json({ error: error.message });
    }
};

export const togglePostLike = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user?.userId;
        const postId = req.params.id as string;
        
        if (!userId) {
             res.status(401).json({ error: "Unauthorized" });
             return;
        }

        const result = await toggleLikeService(userId, postId);
        res.status(200).json(result);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const recordView = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user?.userId;
        const postId = req.params.id as string;
        
        if (!userId) {
             res.status(401).json({ error: "Unauthorized" });
             return;
        }

        await recordViewService(userId, postId);
        res.status(200).json({ message: "View recorded" });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const updatePost = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { title, content, type, published, prompt, tags, authorNote } = req.body;
        const authorId = req.user?.userId;
        const postId = req.params.id as string;

        if (!authorId) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }

        if (!title || !content || !type) {
            res.status(400).json({ error: "Title, content, and type are required" });
            return;
        }

        const post = await updatePostService(postId, authorId, title, content, type, published ?? false, prompt, tags, authorNote);
        res.status(200).json({ message: "Post updated successfully", post });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getMyWritings = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user?.userId;
        
        if (!userId) {
             res.status(401).json({ error: "Unauthorized" });
             return;
        }

        const data = await getMyWritingsService(userId);
        res.status(200).json(data);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
