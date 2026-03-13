import prisma from '../config/db';

export const adminService = {
  getAllNgos: async () => {
    return prisma.nGO.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true,
            createdAt: true
          }
        },
        _count: {
          select: { campaigns: true }
        }
      }
    });
  },

  verifyNgo: async (id: string, status: 'VERIFIED' | 'REJECTED') => {
    return prisma.nGO.update({
      where: { id },
      data: { verificationStatus: status }
    });
  },

  getAllCampaigns: async () => {
    return prisma.campaign.findMany({
      include: {
        ngo: {
          select: { organizationName: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
  },

  approveCampaign: async (id: string, status: 'APPROVED' | 'REJECTED') => {
    return prisma.campaign.update({
      where: { id },
      data: { status }
    });
  },

  getStats: async () => {
    const [userCount, campaignCount, totalRaised, donationCount] = await Promise.all([
      prisma.user.count(),
      prisma.campaign.count(),
      prisma.campaign.aggregate({ _sum: { raisedAmount: true } }),
      prisma.donation.count()
    ]);

    return {
      users: userCount,
      campaigns: campaignCount,
      totalRaised: totalRaised._sum.raisedAmount || 0,
      donations: donationCount
    };
  }
};
