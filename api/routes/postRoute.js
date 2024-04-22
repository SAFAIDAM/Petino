import express from 'express'
import { createBlog, getBlogs, getBlog, getUserBlog, getCommentsBlog, likeBlog, commentBlog, deleteBlog, updateBlog } from "../controllers/postController.js";
import userAuth from "../middleware/authMiddleware.js"


const router = express.Router();

//create post
router.post('/create-post', userAuth, createBlog);

// get posts
router.get("/blog", userAuth, getBlogs);
router.get("/:id", userAuth, getBlog);


router.get("/get-user-post/:id", userAuth, getUserBlog);

// updatePost
router.put("/update-post/:id", userAuth, updateBlog);

// get comments
router.get("/comments/:postId", getCommentsBlog);

// post a comment
router.post("/comment/:id", userAuth, commentBlog); 

//like and comment on posts
router.post("/like/:id", userAuth, likeBlog);

//delete post
router.delete("/:id", userAuth, deleteBlog);


export default router;