import User from "../models/User.js";
import Comment from "../models/Comment.js";

/* CREATE */
export const createComment = async (req, res) => {
    try {
        const { postId, userId, comment } = req.body;
        const user = await User.findById(userId);
        const newComment = new Comment({
            postId,
            userId,
            userName: `${user.firstName} ${user.lastName}`,
            comment,
            likes: {}
        });
        await newComment.save();

        const comments = await Comment.find({ postId }).sort({ createdAt: -1 });
        res.status(201).json(comments);
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
}

/* READ */
export const getComments = async (req, res) => {
    try {
        const { postId } = req.params;
        const comments = await Comment.find({ postId }).sort({ createdAt: -1 });
        res.status(200).json(comments);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}


/* UPDATE */
export const likeComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const comment = await Comment.findById(id);
        const isLiked = comment.likes.get(userId);

        if (isLiked)
            comment.likes.delete(userId);
        else
            comment.likes.set(userId, true);

        const updatedComment = await Comment.findByIdAndUpdate(
            id,
            { likes: comment.likes },
            { new: true } //returns the modified object rather than original
        );
        res.status(200).json(updatedComment);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

/* DELETE */
export const deleteComment = async (req, res) => {
    try {
        const { id, postId } = req.params;
        await Comment.findByIdAndDelete(id);

        const comments = await Comment.find(postId).sort({ createdAt: -1 });
        res.status(200).json(comments);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}