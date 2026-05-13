import { Router } from 'express';
import { getSquads, createSquadController, updateSquadController, putSquadController, deleteSquadController, getMySquadsController, joinSquadController} from '../controllers/squad_controller.js';
import { validate } from '../middlewares/validate_middleware.js';
import { createSquadSchema, updateSquadSchema } from '../schemas/squad_schema.js';
import { authGuard } from '../middlewares/auth_guard.js';

const router = Router();

router.get('/my-squads', authGuard, getMySquadsController);
router.get('/', authGuard, getSquads);
router.post('/', authGuard, validate(createSquadSchema), createSquadController);
router.post('/:id/join', authGuard, joinSquadController);
router.patch('/:id', authGuard, validate(updateSquadSchema), updateSquadController);
router.put('/:id', authGuard, validate(createSquadSchema), putSquadController);
router.delete('/:id', authGuard, deleteSquadController);

export default router;