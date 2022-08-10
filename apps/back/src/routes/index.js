import express from 'express';
import messageController from '../controllers/message.js';
import userController from '../controllers/user.js';
const router = express.Router();
import prisma from '../prisma/prisma.js';

router.post('/message/:roomId', messageController().createMessage);
router.get('/room/:roomId/users', userController().getUser);
router.get('/toto', async (req, res) => {
  return res.json(await prisma.user.findMany());
});

export default router;
