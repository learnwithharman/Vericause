import { Router } from 'express';
import { campaignController } from '../controllers/campaign.controller';
import { authenticate } from '../middleware/auth.middleware';
import { requireRole } from '../middleware/role.middleware';

const router = Router();

router.get('/', campaignController.getAll);
router.get('/:id', campaignController.getById);

router.post('/', authenticate, requireRole('NGO', 'ADMIN'), campaignController.create);
router.put('/:id', authenticate, requireRole('NGO', 'ADMIN'), campaignController.update);
router.patch('/:id/toggle-status', authenticate, requireRole('NGO', 'ADMIN'), campaignController.toggleStatus);
router.delete('/:id', authenticate, requireRole('NGO', 'ADMIN'), campaignController.delete);
router.post('/:id/updates', authenticate, requireRole('NGO', 'ADMIN'), campaignController.addUpdate);

export default router;
