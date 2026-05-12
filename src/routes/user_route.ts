import { Router } from 'express';
import { getUsers, createUserController, updateUserController, putUserController, deleteUserController, getMeController } from '../controllers/user_controller.js';
import { validate } from '../middlewares/validate_middleware.js';
import { createUserSchema, updateUserSchema } from '../schemas/user_schema.js';
import { authGuard } from '../middlewares/auth_guard.js';

const router = Router();

router.get('/me', authGuard, getMeController);
router.get('/', authGuard, getUsers);
router.post('/', validate(createUserSchema), createUserController);
router.patch('/:id', authGuard, validate(updateUserSchema), updateUserController);
router.put('/:id', authGuard, validate(createUserSchema), putUserController);
router.delete('/:id', authGuard, deleteUserController);

export default router;