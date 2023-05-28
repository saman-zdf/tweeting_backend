import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routes/UserRouter/UserRouter.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 8888;
const corsOption = {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200,
};
// Middleware
app.use(express.json());
app.use(cors(corsOption));
app.get("/", async (req, res) => {
    res.status(200).send({ msg: "Health Check!" });
});
// Users
app.use("/user", userRouter);
app.listen(PORT, () => {
    console.log(`App is on port ${PORT}`);
});
//# sourceMappingURL=index.js.map