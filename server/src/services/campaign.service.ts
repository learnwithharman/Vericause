import prisma from '../config/db';
import { AppError } from '../utils/AppError';

interface CampaignCreateData {
  title: string;
  description: string;
  goalAmount: number;
  category: string;
  imageUrl?: string;
  verificationDocUrl?: string;
}

interface CampaignUpdateData {
  title?: string;
  description?: string;
  goalAmount?: number;
  category?: string;
  status?: string;
  imageUrl?: string;
  verificationDocUrl?: string;
}

interface ImpactUpdateData {
  title: string;
  description: string;
  imageUrl?: string;
}

export const campaignService = {
  getAll: async (filters: { category?: string; status?: string; userId?: string }) => {
    const whereClause: any = {
      ...(filters.category ? { category: filters.category } : {}),
      ...(filters.userId ? { ngo: { userId: filters.userId } } : {}),
    };

    if (filters.status && filters.status !== 'ALL') {
      whereClause.status = filters.status;
    } else if (!filters.status) {
      whereClause.status = 'APPROVED';
    }
    // If status is 'ALL', we don't add a status filter at all, yielding all campaigns for that user/category

    return prisma.campaign.findMany({
      where: whereClause,
      include: {
        ngo: { select: { organizationName: true, verificationStatus: true } },
        _count: { select: { donations: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  },

  getById: async (id: string) => {
    const campaign = await prisma.campaign.findUnique({
      where: { id },
      include: {
        ngo: { select: { organizationName: true, verificationStatus: true } },
        impactUpdates: { orderBy: { createdAt: 'desc' } },
        _count: { select: { donations: true } },
      },
    });
    if (!campaign) throw new AppError('Campaign not found', 404);
    return campaign;
  },

  create: async (userId: string, data: CampaignCreateData) => {
    const ngo = await prisma.nGO.findUnique({ where: { userId } });
    if (!ngo) throw new AppError('NGO profile not found', 404);
    
    // Requirement for verification doc at campaign level
    if (!data.verificationDocUrl) {
      throw new AppError('Verification documentation is required for each campaign.', 400);
    }
    
    if (!data.imageUrl) {
      throw new AppError('Campaign must have at least one valid supporting image.', 400);
    }

    return prisma.campaign.create({
      data: {
        title: data.title,
        description: data.description,
        goalAmount: data.goalAmount,
        imageUrl: data.imageUrl,
        verificationDocUrl: data.verificationDocUrl,
        category: data.category,
        ngoId: ngo.id,
        status: 'PENDING', // Default to PENDING for review
        transparencyScore: 0,
      },
    });
  },

  update: async (id: string, data: CampaignUpdateData, userId: string, role: string) => {
    const campaign = await prisma.campaign.findUnique({ where: { id }, include: { ngo: true } });
    if (!campaign) throw new AppError('Campaign not found', 404);

    // Ownership check
    if (role !== 'ADMIN' && campaign.ngo.userId !== userId) {
      throw new AppError('Unauthorized to manage this campaign', 403);
    }

    return prisma.campaign.update({
      where: { id },
      data: {
        ...(data.title && { title: String(data.title) }),
        ...(data.description && { description: String(data.description) }),
        ...(data.goalAmount && { goalAmount: Number(data.goalAmount) }),
        ...(data.category && { category: String(data.category) }),
        ...(data.status && { status: String(data.status) }),
      },
    });
  },

  toggleStatus: async (id: string, userId: string, role: string) => {
    const campaign = await prisma.campaign.findUnique({ where: { id }, include: { ngo: true } });
    if (!campaign) throw new AppError('Campaign not found', 404);

    // Ownership check
    if (role !== 'ADMIN' && campaign.ngo.userId !== userId) {
      throw new AppError('Unauthorized to manage this campaign', 403);
    }

    const newStatus = campaign.status === 'PAUSED' ? 'APPROVED' : 'PAUSED';
    return prisma.campaign.update({
      where: { id },
      data: { status: newStatus },
    });
  },

  delete: async (id: string, userId: string, role: string) => {
    const campaign = await prisma.campaign.findUnique({ where: { id }, include: { ngo: true } });
    if (!campaign) throw new AppError('Campaign not found', 404);

    // Ownership check
    if (role !== 'ADMIN' && campaign.ngo.userId !== userId) {
      throw new AppError('Unauthorized to manage this campaign', 403);
    }

    // Cascading delete for related objects if needed, but Prisma relation should handle if configured or we do it manually
    // For now, simple delete
    await prisma.campaign.delete({ where: { id } });
    return { success: true };
  },

  addUpdate: async (campaignId: string, data: ImpactUpdateData) => {
    return prisma.impactUpdate.create({
      data: {
        campaign: { connect: { id: campaignId } },
        title: String(data.title),
        description: String(data.description),
        imageUrl: data.imageUrl ? String(data.imageUrl) : undefined,
      },
    });
  }
};
