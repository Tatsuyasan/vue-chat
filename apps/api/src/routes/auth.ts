import express from 'express';
import { verifyTokenMiddleware } from '../services/auth';
import { register, login, refreshToken } from '../controllers/auth';

const router = express.Router();

router.route('/register').post(register);
router.route('/login').all(verifyTokenMiddleware).post(login);
router.route('/refreshToken').post(refreshToken);

export default router;
