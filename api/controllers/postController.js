import Blogs from "../models/postModel.js";
import Comments from "../models/commentModel.js";



export const createBlog = async (req, res, next) => {
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

        const blog = await Blogs.create({
            userId,
            description,
            imageUrl,
            hashtags,
        });

        console.log('blog', blog);
        console.log('image', imageUrl);

        res.status(200).json({
            success: true,
            message: "Blog created successfully",
            data: blog,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};



export const getBlogs = async (req, res, next) => {
    try {
        // Access the search query from req.query instead of req.body
        const search = req.query.search;

        // Check if the search query is for hashtags
        const isHashtagSearch = search && search.startsWith('#');

        // Simplified search query to only search within the description field or hashtags
        let searchPostQuery = {};
        if (search) {
            if (isHashtagSearch) {
                // Remove the '#' from the search query
                const hashtag = search.substring(1);
                searchPostQuery = {
                    hashtags: { $regex: hashtag, $options: "i" }
                };
            } else {
                searchPostQuery = {
                    description: { $regex: search, $options: "i" }
                };
            }
        }

        // Debugging: Log the simplified search query
        console.log("Simplified search query:", searchPostQuery);

        const blog = await Blogs.find(search ? searchPostQuery : {})
            .populate({
                path: "userId",
                select: "fullName username profilePicture",
            })
            .sort({ _id: -1 });

        res.status(200).json({
            success: true,
            message: "Posts retrieved successfully",
            data: blog,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};




export const getBlog = async (req, res, next) => {
    try {
        const { id } = req.params;
    
        const blog = await Blogs.findById(id)
            .populate({
                path: "userId",
                select: "fullName username profilePicture", 
            })
            .populate("comments");
    
        if (!blog) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }
    
        res.status(200).json({
            success: true,
            message: "Post retrieved successfully",
            data: blog,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};


export const getUserBlog = async (req, res, next) => {
    try {
        const { id } = req.params;

        const blogs = await Blogs.find({ userId: id })
            .populate({
                path: "userId",
                select: "fullName username profilePicture", 
            })
            .sort({ createdAt: -1 }); 
    
        res.status(200).json({
            success: true,
            message: "Posts retrieved successfully",
            data: blogs,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};



export const getCommentsBlog = async (req, res, next) => {
    try {
        const { postId } = req.params;
    
        const postComments = await Comments.find({ postId })
            .populate({
                path: "userId",
                select: "fullName username profilePicture", // Include the necessary fields
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


export const likeBlog = async (req, res, next) => {
    try {
        const { userId } = req.body.user;
        const { id } = req.params;
    
        const blog = await Blogs.findById(id);
    
        const index = blog.likes.findIndex((pid) => pid === String(userId));
    
        if (index === -1) {
            blog.likes.push(userId);
        } else {
            blog.likes = blog.likes.filter((pid) => pid !== String(userId));
        }
    
        const newBlog = await Blogs.findByIdAndUpdate(id, blog, {
            new: true,
        });
    
        res.status(200).json({
            sucess: true,
            message: "successfully",
            data: newBlog,
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
};


export const commentBlog = async (req, res, next) => {
    try {
        const { comment } = req.body;
        const { userId } = req.body.user;
        const { id } = req.params;
    
        if (!comment) {
            return res.status(400).json({ message: "Comment is required." });
        }
    
        const newComment = new Comments({ comment, userId, postId: id });
    
        await newComment.save();
    
        const blog = await Blogs.findById(id);
    
        blog.comments.push(newComment._id);
    
        await blog.save();
    
        res.status(201).json(newComment);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const deleteBlog = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedPost = await Blogs.findByIdAndDelete(id);
        if (!deletedPost) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }
        return res.status(200).json({ success: true, message: "Deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};


export const updateBlog = async (req, res, next) => {
    try {
        const postId = req.params.id; // Get the post ID from request parameters
        const { userId } = req.body.user; // Get the user ID from request body
        const { description, hashtags, imageUrl } = req.body; // Destructure description, hashtags, and imageUrl from request body

        // Find the post by ID
        const blog = await Blogs.findById(postId);

        // Check if the post exists
        if (!blog) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Check if the user is authorized to update the post
        if (blog.userId.toString() !== userId) {
            return res.status(403).json({ message: "You are not authorized to update this post" });
        }

        // Update the post properties
        blog.description = description;
        blog.hashtags = hashtags;
        blog.imageUrl = imageUrl; // Update the imageUrl field

        // Save the updated post
        await blog.save();

        // Respond with success message and updated post data
        res.status(200).json({
            success: true,
            message: "Post updated successfully",
            data: blog,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};