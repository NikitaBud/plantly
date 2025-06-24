import express from 'express';
import Auth from '../controllers/auth.js';
import authMiddleware from '../middleware/auth.js';
import getCurrentUser from '../controllers/getCurrentUser.js';

const router = express.Router();

router.post('/login', Auth.login);
router.post('/register', Auth.register);
router.post('/logout', Auth.logout);

// router.post('/logout', Auth.logout);

router.get('/current-user', authMiddleware, getCurrentUser);

export default router;
