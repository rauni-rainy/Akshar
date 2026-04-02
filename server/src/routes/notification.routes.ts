import { Router } from 'express';
import { getNotifications, markAsRead, markAllAsRead } from '../controllers/notification.controller';
import { requireAuth } from '../middlewares/auth.middleware';

const router = Router();

// Notice: Put specific routes before param routes
router.put('/read-all', requireAuth, markAllAsRead);
router.put('/:id/read', requireAuth, markAsRead);
router.get('/', requireAuth, getNotifications);

export default router;
