import Posts from "../models/postModel.js";
import Comments from "../models/commentModel.js";

export const createPost = async (req, res, next) => {
    try {
        const { userId } = req.body.user;
        const { description, image, hashtags } = req.body; // Extract hashtags from the request body
    
        if (!description) {
            next("You must provide a description");
            return;
        } else if (!hashtags || hashtags.length === 0) {
            next("You must provide tags");
        }
    
        const post = await Posts.create({
            userId,
            description,
            image,
            hashtags, // Include hashtags in the post creation
        });
    
        res.status(200).json({
            success: true,
            message: "Post created successfully",
            data: post,
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
};


// search by description and hashtags
export const getPosts = async (req, res, next) => {
    try {
        const { search } = req.body;

        const searchPostQuery = {
            $or: [
                { description: { $regex: search, $options: "i" } }, // search by description
                { hashtags: { $regex: search, $options: "i" } } // search by hashtags
            ]
        };

        const posts = await Posts.find(search ? searchPostQuery : {})
            .populate({
                path: "userId",
                select: "fullName username profilePicture",
            })
            .sort({ _id: -1 });

        res.status(200).json({
            success: true,
            message: "Posts retrieved successfully",
            data: posts,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getPost = async (req, res, next) => {
    try {
        const { id } = req.params;
    
        const post = await Posts.findById(id)
            .populate({
                path: "userId",
                select: "fullName username profilePicture", 
            })
            .populate("comments");
    
        if (!post) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }
    
        res.status(200).json({
            success: true,
            message: "Post retrieved successfully",
            data: post,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};


export const getUserPost = async (req, res, next) => {
    try {
        const { id } = req.params;

        const posts = await Posts.find({ userId: id })
            .populate({
                path: "userId",
                select: "fullName username profilePicture", 
            })
            .sort({ createdAt: -1 }); 
    
        res.status(200).json({
            success: true,
            message: "Posts retrieved successfully",
            data: posts,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};


export const getComments = async (req, res, next) => {
    try {
        const { postId } = req.params;
    
        const postComments = await Comments.find({ postId })
            .populate({
                path: "userId",
                select: "fullName username profilePicture",
            })
            .populate({
                path: "replies.userId",
                select: "fullName username profilePicture", 
            })
            .sort({ createdAt: -1 });
    
        res.status(200).json({
            success: true,
            message: "Comments retrieved successfully",
            data: postComments,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};


export const likePost = async (req, res, next) => {
    try {
        const { userId } = req.body.user;
        const { id } = req.params;
    
        const post = await Posts.findById(id);
    
        const index = post.likes.findIndex((pid) => pid === String(userId));
    
        if (index === -1) {
            post.likes.push(userId);
        } else {
            post.likes = post.likes.filter((pid) => pid !== String(userId));
        }
    
        const newPost = await Posts.findByIdAndUpdate(id, post, {
            new: true,
        });
    
        res.status(200).json({
            sucess: true,
            message: "successfully",
            data: newPost,
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
};

export const likePostComment = async (req, res, next) => {
    const { userId } = req.body.user;
    const { id, rid } = req.params;

    try {
        if (rid === undefined || rid === null || rid === `false`) {
            const comment = await Comments.findById(id);
    
            const index = comment.likes.findIndex((el) => el === String(userId));
    
            if (index === -1) {
                comment.likes.push(userId);
            } else {
                comment.likes = comment.likes.filter((i) => i !== String(userId));
            }
    
            const updated = await Comments.findByIdAndUpdate(id, comment, {
                new: true,
            });
    
            res.status(201).json(updated);
        } else {
            const replyComments = await Comments.findOne(
                { _id: id },
                {
                    replies: {
                        $elemMatch: {
                            _id: rid,
                        },
                    },
                }
            );
    
            const index = replyComments?.replies[0]?.likes.findIndex(
                (i) => i === String(userId)
            );
    
            if (index === -1) {
                replyComments.replies[0].likes.push(userId);
            } else {
                replyComments.replies[0].likes = replyComments.replies[0]?.likes.filter(
                    (i) => i !== String(userId)
                );
            }
    
            const query = { _id: id, "replies._id": rid };
    
            const updated = {
            $set: {
                "replies.$.likes": replyComments.replies[0].likes,
            },
            };
    
            const result = await Comments.updateOne(query, updated, { new: true });
    
            res.status(201).json(result);
        }
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
};

export const commentPost = async (req, res, next) => {
    try {
        const { comment, from } = req.body;
        const { userId } = req.body.user;
        const { id } = req.params;
    
        if (comment === null) {
            return res.status(404).json({ message: "Comment is required." });
        }
    
        const newComment = new Comments({ comment, from, userId, postId: id });
    
        await newComment.save();
    
        const post = await Posts.findById(id);
    
        post.comments.push(newComment._id);
    
        const updatedPost = await Posts.findByIdAndUpdate(id, post, {
            new: true,
        });
    
        res.status(201).json(newComment);
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
};

export const replyPostComment = async (req, res, next) => {
    const { userId } = req.body.user;
    const { comment, replyAt, from } = req.body;
    const { id } = req.params;

    if (comment === null) {
        return res.status(404).json({ message: "Comment is required." });
    }

    try {
        const commentInfo = await Comments.findById(id);
    
        commentInfo.replies.push({
            comment,
            replyAt,
            from,
            userId,
            created_At: Date.now(),
        });
    
        commentInfo.save();
    
        res.status(200).json(commentInfo);
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
};

export const deletePost = async (req, res, next) => {
    try {
        const { id } = req.params;
    
        await Posts.findByIdAndDelete(id);
    
        res.status(200).json({
            success: true,
            message: "Deleted successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
};