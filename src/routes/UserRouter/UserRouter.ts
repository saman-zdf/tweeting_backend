import express from "express";
import { UserSignUp } from "../../controller/UserController/UserController.js";
import { tryCatch } from "../../utils/tryCatch.js";

const router = express.Router();

// User Signup
router.post("/sign-up", tryCatch(UserSignUp));

export default router;
