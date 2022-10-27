import { PrismaClient } from '@prisma/client';
import { defaultRooms } from 'shared';

const prisma = new PrismaClient();

async function main() {
  defaultRooms.map(async r => {
    await prisma.room.upsert({
      where: { id: r.id },
      update: {},
      create: {
        ...r,
        users: {},
        messages: {}
      }
    });
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
    e;
  });
