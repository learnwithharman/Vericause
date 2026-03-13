import { Router } from 'express';
import { donationController } from '../controllers/donation.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.post('/', authenticate, donationController.create);
router.get('/user', authenticate, donationController.getByUser);
router.get('/campaign/:id', donationController.getByCampaign);

export default router;
