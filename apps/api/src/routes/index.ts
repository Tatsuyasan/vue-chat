import express from 'express';
const router = express.Router();
import prisma from '../prisma/prisma';

import userRoutes from './user';
import roomRoutes from './room';
import messageRoutes from './message';

router.use('/user', userRoutes);
router.use('/room', roomRoutes);
router.use('/message', messageRoutes);

router.get('/', async (req, res) => {
  return res.json(await prisma.user.findMany());
});

export default router;
