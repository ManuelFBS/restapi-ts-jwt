import { Router } from 'express';
import { TokenValidation } from '../libs/tokens/verifyToken';
import {
  getAllUsers,
  getUserByUserNameOrEmail,
  deleteUser,
  updateUser,
} from '../controllers/users/users.controller';

const router: Router = Router();

router.get('/', TokenValidation, getAllUsers);

router.get(
  '/user/',
  TokenValidation,
  getUserByUserNameOrEmail,
);

export default router;
