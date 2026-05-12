import { Router } from 'express';
import { getActions, createActionController, updateActionController, putActionController, deleteActionController } from '../controllers/action_controller.js';
import { validate } from '../middlewares/validate_middleware.js';
import { createActionSchema, updateActionSchema } from '../schemas/action_schema.js';
import { authGuard } from '../middlewares/auth_guard.js';

const router = Router();

router.get('/', getActions);
router.post('/', authGuard, validate(createActionSchema), createActionController);
router.patch('/:id', authGuard, validate(updateActionSchema), updateActionController);
router.put('/:id', authGuard, validate(createActionSchema), putActionController);
router.delete('/:id', authGuard, deleteActionController);

export default router;