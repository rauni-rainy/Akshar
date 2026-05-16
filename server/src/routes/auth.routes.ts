import { Router } from 'express';
import { register, login, googleAuth, googleAuthComplete } from '../controllers/auth.controller';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/google', googleAuth);
router.post('/google/complete', googleAuthComplete);

export default router;
