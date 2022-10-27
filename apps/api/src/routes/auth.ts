import express from 'express';
import { register, login, refreshToken } from '../controllers/auth';

const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/refresh_token').get(refreshToken);

export default router;
