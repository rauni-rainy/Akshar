import { Router } from 'express';
import { createComment, fetchComments } from '../controllers/comment.controller';
import { requireAuth } from '../middlewares/auth.middleware';

const router = Router();

// GET /api/comments/:postId
router.get('/:postId', fetchComments);

// POST /api/comments/:postId
router.post('/:postId', requireAuth, createComment);

export default router;
