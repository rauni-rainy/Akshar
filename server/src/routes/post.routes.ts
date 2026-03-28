import { Router } from 'express';
import { createPost, getFeeds, getPostById, deletePost, togglePostLike } from '../controllers/post.controller';
import { requireAuth } from '../middlewares/auth.middleware';

const router = Router();

// Public Routes
router.get('/feed', getFeeds);
router.get('/:id', getPostById);

// Protected Routes (Requires a valid Bearer JWT token)
router.post('/', requireAuth, createPost);
router.post('/:id/like', requireAuth, togglePostLike);
router.delete('/:id', requireAuth, deletePost);

export default router;
