import { Router } from 'express';
import { getMe, updateMe, getPublicUser, followUserCtrl, unfollowUserCtrl } from '../controllers/user.controller';
import { requireAuth, optionalAuth } from '../middlewares/auth.middleware';

const router = Router();

router.get('/me', requireAuth, getMe);
router.put('/me', requireAuth, updateMe);
router.get('/:id', optionalAuth, getPublicUser);
router.post('/:id/follow', requireAuth, followUserCtrl);
router.delete('/:id/follow', requireAuth, unfollowUserCtrl);

export default router;
