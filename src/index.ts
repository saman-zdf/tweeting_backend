import express from "express";
import dotenv from "dotenv";
import { Request, Response } from "express";
import cors from "cors";
import userRouter from "./routes/UserRouter/UserRouter.js";
import errorHandlerMiddleware from "./middleware/errorHandler.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 8888;

const corsOption: {
  origin: string;
  credentials: boolean;
  optionSuccessStatus: number;
} = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
// Middleware
app.use(express.json());
app.use(cors(corsOption));

app.get("/", async (req: Request, res: Response) => {
  res.status(200).send({ msg: "Health Check!" });
});

// Users
app.use("/user", userRouter);

app.use(errorHandlerMiddleware);

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
