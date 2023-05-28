import express from "express";
import dotenv from "dotenv";
import { Request, Response } from "express";
dotenv.config();
import prisma from "./lib/db.js";

const app = express();

const PORT = process.env.PORT || 8888;

// Middleware
app.use(express.json());

app.get("/", async (req: Request, res: Response) => {
  const user = await prisma.user.create({
    data: {
      email: "test@test.com",
      password: "121212",
    },
  });
  res.status(201).send({ user });
});

app.listen(PORT, () => {
  console.log(`App is on port ${PORT}`);
});
