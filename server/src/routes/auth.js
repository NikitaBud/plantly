import express from 'express';
import Auth from '../controllers/auth.js';

const router = express.Router();

router.post('/login', Auth.login);
router.post('/register', Auth.register);

export default router;
