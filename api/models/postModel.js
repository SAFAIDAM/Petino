import mongoose, { Schema } from "mongoose";

const postSchema = new mongoose.Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User" },
        description: { type: String, required: true },
        image: { type: String }, // required: true
        hashtags: [{ type: String, required: true }],
        likes: [{ type: String }],
        comments: [{ type: Schema.Types.ObjectId, ref: "Comments" }],
    },
    { timestamps: true }
);

const Posts = mongoose.model("Posts", postSchema);

export default Posts;
