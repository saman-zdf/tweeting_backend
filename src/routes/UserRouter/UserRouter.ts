import express from "express";
import { signUp } from "../../service/User/UserService.js";

const router = express.Router();

// User Signup
router.post("/sign-up", signUp);

export default router;
