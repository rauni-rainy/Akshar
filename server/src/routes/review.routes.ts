import { Router } from 'express';
import { createReview, fetchReviews } from '../controllers/review.controller';
import { requireAuth } from '../middlewares/auth.middleware';

const router = Router();

// GET /api/reviews/:postId
router.get('/:postId', fetchReviews);

// POST /api/reviews/:postId
router.post('/:postId', requireAuth, createReview);

export default router;
