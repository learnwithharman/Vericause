import { Router } from 'express';
import { authController } from '../controllers/auth.controller';
import { upload } from '../services/upload.service';

const router = Router();

router.post('/register', upload.none(), authController.register);
router.post('/login', authController.login);
router.post('/refresh', authController.refresh);
router.post('/logout', authController.logout);

export default router;
