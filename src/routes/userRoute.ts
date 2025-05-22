import { Router } from 'express';
import userController from '../controllers/userController';

const router = Router();

// User API endpoints
router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.post('/logout', userController.logout);

export default router