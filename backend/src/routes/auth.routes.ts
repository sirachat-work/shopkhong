import { Router } from 'express';
import { registerController, loginController } from '../controllers/auth.controller';

const router = Router();

// Debug Check
if (typeof registerController !== 'function') {
  console.error('❌ FATAL ERROR: registerController is undefined! Check export in auth.controller.ts');
}
if (typeof loginController !== 'function') {
  console.error('❌ FATAL ERROR: loginController is undefined! Check export in auth.controller.ts');
}

// Routes Definition
router.post('/register', registerController);
router.post('/login', loginController);

export default router;