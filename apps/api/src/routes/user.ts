import express from 'express';
import { verifyTokenMiddleware } from '../services/auth';
import {
  read,
  update,
  deleteUser,
  connectUserToRoom
} from '../controllers/user';

const router = express.Router();

router
  .route('/:id')
  .all(verifyTokenMiddleware)
  .get(read)
  .put(update)
  .post(connectUserToRoom)
  .delete(deleteUser);

export default router;
