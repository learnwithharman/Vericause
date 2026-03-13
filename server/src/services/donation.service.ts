import prisma from '../config/db';

export const donationService = {
  create: async (userId: string, campaignId: string, amount: number) => {
    const donation = await prisma.donation.create({
      data: {
        user: { connect: { id: userId } },
        campaign: { connect: { id: campaignId } },
        amount,
        status: 'COMPLETED',
      },
    });

    await prisma.campaign.update({
      where: { id: campaignId },
      data: { raisedAmount: { increment: amount } },
    });

    return donation;
  },

  getByUser: async (userId: string) => {
    return prisma.donation.findMany({
      where: { userId },
      include: {
        campaign: {
          select: { title: true, category: true, ngo: { select: { organizationName: true } } },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  },

  getByCampaign: async (campaignId: string) => {
    return prisma.donation.findMany({
      where: { campaignId },
      include: { user: { select: { name: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }
};
