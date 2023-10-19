import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

const passwords = {
  '123456': '$2b$10$KoO6kyzZTA5Om6YSJMpLyO1wIXMO/DL9QVXDzO3QpMm.qcvlsNtGa',
};

async function createUsers() {
  const nurlan = await prisma.user.upsert({
    where: { email: 'nurlan@joldibaev.uz' },
    update: {},
    create: {
      email: 'nurlan@joldibaev.uz',
      name: 'Nurlan',
      password: passwords['123456'],
    },
  });

  const justin = await prisma.user.upsert({
    where: { email: 'justin@bieber.com' },
    update: {},
    create: {
      email: 'justin@bieber.com',
      name: 'Justin',
      password: passwords['123456'],
    },
  });

  const scooter = await prisma.user.upsert({
    where: { email: 'scooter@brown.com' },
    update: {},
    create: {
      email: 'scooter@brown.com',
      name: 'Scooter',
      password: passwords['123456'],
    },
  });

  return { nurlan, justin, scooter };
}

async function createChats(nurlan: User, justin: User, scooter: User) {
  const chat = await prisma.chat.create({
    data: {
      users: {
        connect: [nurlan, justin],
      },
      messages: {
        create: [
          {
            text: 'Hey, Justin!',
            authorId: nurlan.id,
          },
        ],
      },
    },
  });

  return [chat];
}

async function createGroups(nurlan: User, justin: User, scooter: User) {
  const chat = await prisma.chat.create({
    data: {
      name: 'Tour All around the World!',
      users: {
        connect: [nurlan, justin, scooter],
      },
      messages: {
        create: [
          {
            text: 'Are you ready, guys?',
            authorId: scooter.id,
          },
          {
            text: 'For sure!',
            authorId: justin.id,
          },
        ],
      },
    },
  });

  return [chat];
}

async function main() {
  const { nurlan, justin, scooter } = await createUsers();
  await createChats(nurlan, justin, scooter);
  await createGroups(nurlan, justin, scooter);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
