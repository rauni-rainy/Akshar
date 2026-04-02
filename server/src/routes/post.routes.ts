import { Router } from 'express';
import { createPost, getFeeds, getPostById, deletePost, togglePostLike, recordView, updatePost, getMyWritings } from '../controllers/post.controller';
import { requireAuth } from '../middlewares/auth.middleware';

const router = Router();

// Public Routes
router.get('/feed', getFeeds);

// Protected Routes (Requires a valid Bearer JWT token)
router.get('/my-writings', requireAuth, getMyWritings);

router.get('/:id', getPostById);

router.post('/', requireAuth, createPost);
router.put('/:id', requireAuth, updatePost);
router.post('/:id/like', requireAuth, togglePostLike);
router.post('/:id/view', requireAuth, recordView);
router.delete('/:id', requireAuth, deletePost);

export default router;
