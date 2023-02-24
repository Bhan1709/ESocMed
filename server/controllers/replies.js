import User from "../models/User.js";
import Comment from "../models/Comment.js";
import Reply from "../models/Reply.js";

/* CREATE */
export const createReply = async (req, res) => {
    try {
        const { commentId, userId, reply } = req.body;
        const user = await User.findById(userId);
        const newReply = new Reply({
            commentId,
            userId,
            userName: `${user.firstName} ${user.lastName}`,
            reply,
            likes: {}
        });
        await newReply.save();

        const replies = await Reply.find({ commentId }).sort({ createdAt: -1 });
        res.status(201).json(replies);
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
}

/* READ */
export const getReplies = async (req, res) => {
    try {
        const { commentId } = req.params;
        const replies = await Reply.find({ commentId }).sort({ createdAt: -1 });
        res.status(200).json(replies);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

/* UPDATE */
export const likeReply = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const reply = await Reply.findById(id);
        const isLiked = reply.likes.get(userId);

        if (isLiked)
            reply.likes.delete(userId);
        else
            reply.likes.set(userId, true);

        const updatedReply = await Reply.findByIdAndUpdate(
            id,
            { likes: reply.likes },
            { new: true } //returns the modified object rather than original
        );
        res.status(200).json(updatedReply);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

/* DELETE */
export const deleteReply = async (req, res) => {
    try {
        const { id, commentId } = req.params;
        await Reply.findByIdAndDelete(id);

        const replies = await Comment.find(commentId).sort({ createdAt: -1 });
        res.status(200).json(replies);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}