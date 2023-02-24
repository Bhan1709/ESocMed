import express from "express";
import {
    getReplies,
    likeReply,
    deleteReply
} from "../controllers/replies.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/:commentId", verifyToken, getReplies);

/* UPDATE */
router.patch("/:id/like", verifyToken, likeReply);

/* DELETE */
router.delete("/:commentId/:id", verifyToken, deleteReply);

export default router;