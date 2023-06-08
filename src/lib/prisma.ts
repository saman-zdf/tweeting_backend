import { PrismaClient } from '@prisma/client';

declare global {
  // eslint-disable-next-line no-var
  var cachedPrisma: PrismaClient;
}

if (!global.cachedPrisma) {
  global.cachedPrisma = new PrismaClient();
}

export default global.cachedPrisma;
