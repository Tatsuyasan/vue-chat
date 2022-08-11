import express from 'express';
import { verifyToken } from 'controllers/auth';
import { read, create, update, deleteUser } from '../controllers/user';

const router = express.Router();

router.route('/').all(verifyToken).get(read).post(create);

router.use('/:id');

router
  .route('/:id')
  .all(verifyToken)
  .get(read)
  .post(create)
  .put(update)
  .delete(deleteUser);

export default router;
