import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const email = 'admin@vericause.com';
  const password = 'admin123';
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.upsert({
    where: { email },
    update: {
      password: hashedPassword,
      role: 'ADMIN'
    },
    create: {
      name: 'Admin User',
      email,
      password: hashedPassword,
      role: 'ADMIN'
    }
  });

  console.log(`Admin user ${user.email} updated/created successfully with password: ${password}`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
