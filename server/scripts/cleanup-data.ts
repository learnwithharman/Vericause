import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting data cleanup...');

  // Delete in order to satisfy foreign key constraints
  console.log('Deleting Donations...');
  await prisma.donation.deleteMany({});

  console.log('Deleting Impact Updates...');
  await prisma.impactUpdate.deleteMany({});

  console.log('Deleting Fraud Reports...');
  await prisma.fraudReport.deleteMany({});

  console.log('Deleting Campaigns...');
  await prisma.campaign.deleteMany({});

  console.log('Deleting NGOs...');
  await prisma.nGO.deleteMany({});

  console.log('Deleting non-admin Users...');
  const { count } = await prisma.user.deleteMany({
    where: {
      role: {
        not: 'ADMIN'
      }
    }
  });

  console.log(`Cleanup complete. Deleted ${count} non-admin users and all associated data.`);
}

main()
  .catch(e => {
    console.error('Cleanup failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
