// import { app } from "../../index.js";
// import supertest, { SuperTest, Test } from "supertest";
// import { PrismaClient } from "@prisma/client";
// import prisma from "../../config/db.js";

// describe("User API - [POST] /user/sign-up", () => {
//   const request: SuperTest<Test> = supertest(app);
//   let prismaDB: PrismaClient;

//   const singUpUser = async (payload: object) => {
//     return await request.post("/user/sign-up").send(payload);
//   };

//   beforeAll(() => {
//     prismaDB = prisma;
//   });

//   beforeEach(async () => {
//     await singUpUser({
//       username: "Grant",
//       email: "grant@email.com",
//       password: "my-secret",
//     });
//   });
//   afterEach(async () => {
//     await prisma.user.deleteMany();
//   });

//   afterAll(async () => {
//     await prisma.$disconnect();
//   });

//   test("Test should return error for missing Email and Password", async () => {
//     const payload = {};
//     const res = await singUpUser(payload);
//     expect(res.status).toBe(400);
//   });
// });
