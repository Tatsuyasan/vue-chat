import express from 'express';
import { createMessage } from '../controllers/message';
import { getUser } from '../controllers/user';
const router = express.Router();
import prisma from '../prisma/prisma';

router.post('/message/:roomId', createMessage);
router.get('/room/:roomId/users', getUser);
router.get('/toto', async (req, res) => {
  return res.json(await prisma.user.findMany());
});

export default router;
