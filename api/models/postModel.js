import mongoose, { Schema } from "mongoose";

const postSchema = new mongoose.Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User" },
        description: { type: String, required: true },
        imageUrl: { type: String },
        hashtags: [{ type: String, required: true }],
        likes: [{ type: String }],
        comments: [{ type: Schema.Types.ObjectId, ref: "Comments" }],
    },
    { timestamps: true }
);

const Blogs = mongoose.model("Blogs", postSchema);

export default Blogs;
