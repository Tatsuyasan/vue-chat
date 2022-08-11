import express from 'express';
import { verifyToken } from 'controllers/auth';
import { create, deleteMessage, update } from '../controllers/message';

const router = express.Router();

router.route('/:roomId').all(verifyToken).post(create);

router
  .route('/:roomId/:messageId')
  .all(verifyToken)
  .put(update)
  .delete(deleteMessage);

export default router;
