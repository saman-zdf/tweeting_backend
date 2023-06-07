import { PrismaClient } from '@prisma/client';
import { DeepMockProxy, mockDeep, mockReset } from 'jest-mock-extended';

import prisma from '../prisma';

// I might need to use vitest as it is a lot easier to set up and also there is good docs in prisma.io for setting up the test environment with Docker
jest.mock('../prisma.ts', () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}));

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;

beforeEach(() => {
  mockReset(prismaMock);
});

export default prismaMock;
