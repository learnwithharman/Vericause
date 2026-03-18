import { NextFunction, Response } from 'express';
import { campaignService } from '../services/campaign.service';
import { AuthRequest } from '../middleware/auth.middleware';
import { z } from 'zod';

const campaignSchema = z.object({
  title: z.string().min(5),
  description: z.string().min(20),
  goalAmount: z.number().positive(),
  category: z.string(),
});

export const campaignController = {
  getAll: async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const filters = {
        category: req.query.category as string,
        status: req.query.status as string,
        // Enforce ownership for NGOs, Admin sees all unless they specify
        userId: req.user?.role === 'NGO' ? req.user.id : undefined,
      };
      const campaigns = await campaignService.getAll(filters);
      res.json(campaigns);
    } catch (error: unknown) {
      next(error);
    }
  },

  getById: async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const campaign = await campaignService.getById(req.params.id);
      res.json(campaign);
    } catch (error: unknown) {
      next(error);
    }
  },

  create: async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { title, description, category } = req.body;
      const goalAmount = parseFloat(req.body.goalAmount);
      
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      const imageUrl = files?.image?.[0] ? `/uploads/${files.image[0].filename}` : undefined;
      const verificationDocUrl = files?.verificationDoc?.[0] ? `/uploads/${files.verificationDoc[0].filename}` : undefined;
      
      const campaign = await campaignService.create(req.user!.id, {
        title,
        description,
        goalAmount,
        category,
        imageUrl,
        verificationDocUrl
      });
      res.status(201).json(campaign);
    } catch (error: unknown) {
      next(error);
    }
  },

  update: async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const campaign = await campaignService.update(req.params.id, req.body, req.user!.id, req.user!.role);
      res.json(campaign);
    } catch (error: unknown) {
      next(error);
    }
  },

  toggleStatus: async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await campaignService.toggleStatus(req.params.id, req.user!.id, req.user!.role);
      res.json(result);
    } catch (error: unknown) {
      next(error);
    }
  },

  delete: async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await campaignService.delete(req.params.id, req.user!.id, req.user!.role);
      res.json(result);
    } catch (error: unknown) {
      next(error);
    }
  },

  addUpdate: async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const update = await campaignService.addUpdate(req.params.id, req.body);
      res.status(201).json(update);
    } catch (error: unknown) {
      next(error);
    }
  }
};
