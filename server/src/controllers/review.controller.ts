import { Request, Response } from 'express';
import { addReview, getReviewsForPost } from '../services/review.service';
import { AuthRequest } from '../middlewares/auth.middleware';
import { getPostByIdService } from '../services/post.service';

export const createReview = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { rating, observe, interrogate, elevate, creative, annotations } = req.body;
        const { postId } = req.params;
        const authorId = req.user?.userId;

        if (!authorId) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }

        const post = await getPostByIdService(postId as string);
        if (!post) {
            res.status(404).json({ error: "Post not found" });
            return;
        }

        if (post.authorId === authorId) {
            res.status(403).json({ error: "Creators cannot triangulate their own operations." });
            return;
        }

        if (!rating) {
            res.status(400).json({ error: "Review rating is required" });
            return;
        }

        if (!observe && !interrogate && !elevate && (!annotations || annotations.length === 0)) {
            res.status(400).json({ error: "At least one Triangulation vector (Observe, Interrogate, Elevate, or Annotations) must be provided." });
            return;
        }

        const parsedRating = parseInt(rating, 10);
        if (parsedRating < 1 || parsedRating > 5) {
            res.status(400).json({ error: "Rating must be between 1 and 5" });
            return;
        }

        const review = await addReview(authorId, postId as string, parsedRating, observe, interrogate, elevate, creative, annotations);
        res.status(201).json({ message: "Peer Review logged successfully", review });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

export const fetchReviews = async (req: Request, res: Response): Promise<void> => {
    try {
        const { postId } = req.params;
        const reviews = await getReviewsForPost(postId as string);
        res.status(200).json(reviews);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
