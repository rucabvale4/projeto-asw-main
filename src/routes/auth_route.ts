import { Router } from 'express';
import { loginController } from '../controllers/auth_controller.js';

const router = Router();

router.post('/login', loginController);

export default router;