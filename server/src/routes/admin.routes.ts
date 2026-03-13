import { Router } from 'express';
import { adminController } from '../controllers/admin.controller';
import { authenticate } from '../middleware/auth.middleware';
import { requireRole } from '../middleware/role.middleware';

const router = Router();

router.get('/ngos', authenticate, requireRole('ADMIN'), adminController.getAllNgos);
router.put('/ngos/:id/verify', authenticate, requireRole('ADMIN'), adminController.verifyNgo);
router.get('/stats', authenticate, requireRole('ADMIN'), adminController.getStats);
router.get('/campaigns', authenticate, requireRole('ADMIN'), adminController.getAllCampaigns);
router.put('/campaigns/:id/approve', authenticate, requireRole('ADMIN'), adminController.approveCampaign);

export default router;
