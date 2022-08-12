import express from 'express';
import { verifyTokenMiddleware } from '../services/auth';
import { read, update, deleteUser } from '../controllers/user';

const router = express.Router();

router
  .route('/:id')
  .all(verifyTokenMiddleware)
  .get(read)
  .put(update)
  .delete(deleteUser);

export default router;
