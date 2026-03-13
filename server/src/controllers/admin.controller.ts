import { NextFunction, Request, Response } from 'express';
import { adminService } from '../services/admin.service';

export const adminController = {
  getAllNgos: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const ngos = await adminService.getAllNgos();
      res.json(ngos);
    } catch (error: unknown) {
      next(error);
    }
  },

  verifyNgo: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!['VERIFIED', 'REJECTED'].includes(status)) {
        res.status(400).json({ error: 'Invalid status' });
        return;
      }

      const ngo = await adminService.verifyNgo(id, status);
      res.json(ngo);
    } catch (error: unknown) {
      next(error);
    }
  },

  getStats: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const stats = await adminService.getStats();
      res.json(stats);
    } catch (error: unknown) {
      next(error);
    }
  },

  getAllCampaigns: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const campaigns = await adminService.getAllCampaigns();
      res.json(campaigns);
    } catch (error: unknown) {
      next(error);
    }
  },

  approveCampaign: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!['APPROVED', 'REJECTED'].includes(status)) {
        res.status(400).json({ error: 'Invalid status' });
        return;
      }

      const campaign = await adminService.approveCampaign(id, status);
      res.json(campaign);
    } catch (error: unknown) {
      next(error);
    }
  }
};
