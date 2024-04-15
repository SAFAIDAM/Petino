import Posts from "../models/postModel.js";
import Comments from "../models/commentModel.js";



export const createPost = async (req, res, next) => {
    try {
        const { userId } = req.body.user;
        const { description, hashtags, imageUrl } = req.body;

        if (!description) {
            return res.status(400).json({ message: "You must provide a description" });
        }

        if (!hashtags || hashtags.length === 0) {
            return res.status(400).json({ message: "You must provide tags" });
        }

        if (!imageUrl) {
            return res.status(400).json({ message: "You must provide an image URL" });
        }

        const post = await Posts.create({
            userId,
            description,
            imageUrl,
            hashtags,
        });

        console.log('post', post);
        console.log('image', imageUrl);

        res.status(200).json({
            success: true,
            message: "Post created successfully",
            data: post,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};



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


export const commentPost = async (req, res, next) => {
    try {
        const { comment } = req.body;
        const { userId } = req.body.user;
        const { id } = req.params;
    
        if (!comment) {
            return res.status(400).json({ message: "Comment is required." });
        }
    
        const newComment = new Comments({ comment, userId, postId: id });
    
        await newComment.save();
    
        const post = await Posts.findById(id);
    
        post.comments.push(newComment._id);
    
        await post.save();
    
        res.status(201).json(newComment);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const deletePost = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedPost = await Posts.findByIdAndDelete(id);
        if (!deletedPost) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }
        return res.status(200).json({ success: true, message: "Deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};


export const updatePost = async (req, res, next) => {
    try {
        const postId = req.params.id; 
        const { userId } = req.body.user;
        const { description, hashtags } = req.body;

        const post = await Posts.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        if (post.userId.toString() !== userId) {
            return res.status(403).json({ message: "You are not authorized to update this post" });
        }

        post.description = description;
        post.hashtags = hashtags;
        await post.save();

        res.status(200).json({
            success: true,
            message: "Post updated successfully",
            data: post,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};