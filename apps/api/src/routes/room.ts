import express from 'express';
import { verifyToken } from 'controllers/auth';
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
  .all(verifyToken)
  .get(read)
  .get(getMessages)
  .post(create)
  .put(update)
  .delete(deleteRoom);

export default router;
