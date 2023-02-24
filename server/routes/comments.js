import express from "express";
import {
    createComment,
    getComments,
    likeComment,
    deleteComment
} from "../controllers/comments.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* CREATE */
router.post("/:postId", verifyToken, createComment);

/* READ */
router.get("/:postId", verifyToken, getComments);

/* UPDATE */
router.patch("/:id/like", verifyToken, likeComment);

/* DELETE */
router.delete("/:postId/:id", verifyToken, deleteComment);

export default router;