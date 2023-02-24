import mongoose from "mongoose";

const ReplySchema = new mongoose.Schema({
    commentId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    reply: {
        type: String,
        required: true
    },
    likes: {
        type: Map,
        of: Boolean
    }
}, { timestamps: true });

const Reply = mongoose.model("Reply", ReplySchema);

export default Reply;