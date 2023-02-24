import express from "express";
import {
    getComments,
    likeComment,
    deleteComment
} from "../controllers/comments";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/:postId", verifyToken, getComments);

/* UPDATE */
router.patch("/:id/like", verifyToken, likeComment);

/* DELETE */
router.delete("/:postId/:id", verifyToken, deleteComment);

export default router;