import express from "express";
import { verify } from "jsonwebtoken";
import {
    getUser,
    getUserFriends,
    addRemoveFriends
} from "../controllers/users";
import { verifyToken } from "../middleware/auth";

const router = express.Router();

/* READ */
router.get(":/id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);

/* UPDATE */
router.patch("/:id/:friendId", verifyToken, addRemoveFriends);

export default router;
