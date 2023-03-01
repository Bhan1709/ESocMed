import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    postId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    likes: {
        type: Map,
        of: Boolean
    },
    replies: {
        type: Array,
        default: []
    }
}, { timestamps: true });

const Comment = mongoose.model("Comment", CommentSchema);

export default Comment;