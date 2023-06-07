import prisma from '../src/lib/prisma';

async function main() {
  await prisma.user.create({
    data: {
      username: 'John',
      email: 'john.doe@gmail.com',
      password: '$2b$10$Nzm.otOXYQfVmf4m9Hvqq.GwrhAgZwMaFnrQzQ4y.acEA29hTLU4C',
      role: 'USER',
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async () => {
    await prisma.$disconnect();
    process.exit(1);
  });
