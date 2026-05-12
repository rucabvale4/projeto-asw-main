import { Router } from 'express';
import { getSquads, createSquadController, updateSquadController, putSquadController, deleteSquadController } from '../controllers/squad_controller.js';
import { validate } from '../middlewares/validate_middleware.js';
import { createSquadSchema, updateSquadSchema } from '../schemas/squad_schema.js';

const router = Router();

router.get('/', getSquads);
router.post('/', validate(createSquadSchema), createSquadController);
router.patch('/:id', validate(updateSquadSchema), updateSquadController);
router.put('/:id', validate(createSquadSchema), putSquadController);
router.delete('/:id', deleteSquadController);

export default router;