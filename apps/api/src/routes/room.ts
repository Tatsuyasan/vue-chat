import express from 'express';
import { verifyTokenMiddleware } from '../services/auth';
import {
  read,
  messages,
  create,
  update,
  deleteRoom
} from '../controllers/room';

const router = express.Router();

router
  .route('/:id')
  .all(verifyTokenMiddleware)
  .get(read)
  .post(create)
  .put(update)
  .delete(deleteRoom);

router.route('/:id/messages').get(messages);

export default router;
