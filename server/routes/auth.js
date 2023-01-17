import express from "express";
import { login } from "../controllers/auth";

const router = express.Router();

router.post("/login", login); //this is /auth/login coming from app.js

export default router;