import express from 'express';
import { verifyTokenMiddleware } from '../services/auth';
import {
  read,
  getMessages,
  create,
  update,
  deleteRoom
} from '../controllers/room';

const router = express.Router();

router
  .route('/:id')
  .all(verifyTokenMiddleware)
  .get(read)
  .get(getMessages)
  .post(create)
  .put(update)
  .delete(deleteRoom);

export default router;
