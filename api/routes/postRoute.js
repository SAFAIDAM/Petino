import express from 'express'
import { createPost } from '../controllers/postController.js';



const router = express.Router();

router.post('/create-post', createPost);

export default router;