import express from "express";
import { signUp } from "../../controller/UserController/UserController.js";
import { tryCatch } from "../../utils/tryCatch.js";

const router = express.Router();

// User SignUp
router.post("/sign-up", tryCatch(signUp));

// TODO: Add singIn functionality
// User SignIn
// router.post("/sign-in", tryCatch(signIn));

export default router;
