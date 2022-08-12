import express from 'express';
import { verifyTokenMiddleware } from '../services/auth';
import { create, deleteMessage, update } from '../controllers/message';

const router = express.Router();

router.route('/:roomId').all(verifyTokenMiddleware).post(create);

router
  .route('/:roomId/:messageId')
  .all(verifyTokenMiddleware)
  .put(update)
  .delete(deleteMessage);

export default router;
