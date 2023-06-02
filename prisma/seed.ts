import prisma from '../src/config/db';
async function main() {
  await prisma.user.create({
    data: {
      username: 'test',
      email: 'test@test.com',
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
