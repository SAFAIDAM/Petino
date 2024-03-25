import express from 'express'
import { createPost, getPosts, getPost, getUserPost, getComments, likePost, likePostComment, commentPost, replyPostComment, deletePost } from "../controllers/postController.js";
import userAuth from "../middleware/authMiddleware.js"


const router = express.Router();

//create post
router.post('/create-post', userAuth, createPost);

// get posts
router.get("/", userAuth, getPosts);
router.get("/:id", userAuth, getPost);

router.get("/get-user-post/:id", userAuth, getUserPost);

// get comments
router.get("/comments/:postId", getComments);

//like and comment on posts
router.post("/like/:id", userAuth, likePost);
router.post("/like-comment/:id/:rid?", userAuth, likePostComment); // like-cmt/idOfComment Or like-cmt//idOfComment/idOfReply (if reply exist)
router.post("/comment/:id", userAuth, commentPost); // post a comment 
router.post("/reply-comment/:id", userAuth, replyPostComment);

//delete post
router.delete("/:id", userAuth, deletePost);

export default router;