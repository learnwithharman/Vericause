import { NextFunction, Response } from 'express';
import { donationService } from '../services/donation.service';
import { AuthRequest } from '../middleware/auth.middleware';
import { z } from 'zod';

const donationSchema = z.object({
  campaignId: z.string(),
  amount: z.number().positive(),
});

export const donationController = {
  create: async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { campaignId, amount } = donationSchema.parse(req.body);
      const donation = await donationService.create(req.user!.id, campaignId, amount);
      res.status(201).json(donation);
    } catch (error: unknown) {
      next(error);
    }
  },

  getByUser: async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const donations = await donationService.getByUser(req.user!.id);
      res.json(donations);
    } catch (error: unknown) {
      next(error);
    }
  },

  getByCampaign: async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const donations = await donationService.getByCampaign(req.params.id);
      res.json(donations);
    } catch (error: unknown) {
      next(error);
    }
  }
};
