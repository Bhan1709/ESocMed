import Post from "../models/Post.js";
import User from "../models/User.js";
import Comment from "../models/Comment.js";
import fs from "fs";

/* CREATE */
export const createPost = async (req, res) => {
    try {
        const { userId, description, picturePath } = req.body;
        const user = await User.findById(userId);
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            description,
            userPicturePath: user.picturePath,
            picturePath,
            likes: {},
            comments: []
        });
        await newPost.save();

        const posts = await Post.find().sort({ createdAt: -1 });
        res.status(201).json(posts);
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
}

/* READ */
export const getFeedPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        res.status(200).json(posts);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

export const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params;
        const posts = await Post.find({ userId }).sort({ createdAt: -1 });
        res.status(200).json(posts);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

/* UPDATE */
export const likePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const post = await Post.findById(id);
        const isLiked = post.likes.get(userId);

        if (isLiked)
            post.likes.delete(userId);
        else
            post.likes.set(userId, true);

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { likes: post.likes },
            { new: true } //returns the modified object rather than original
        );
        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

/* DELETE */
export const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { isProfile, userId } = req.body;
        const deletedPost = await Post.findByIdAndDelete(id);

        deletedPost.comments.forEach(async (commentId) => (await Comment.findByIdAndDelete(commentId)));

        fs.unlink(`./public/assets/${deletedPost.picturePath}`, (err) => {
            if (err)
                console.error(err);
        });

        let filter = {};
        if (isProfile)
            filter = { userId };
        const posts = await Post.find(filter).sort({ createdAt: -1 });
        res.status(200).json(posts);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}