import express from 'express';
import { createPost, getPosts, getPostById,  editPostById, deletePostById } from '../controllers/postController.js';


const router = express.Router();


router.post('/create', createPost);
router.get('/get', getPosts);
router.get('/get/:id', getPostById);
router.put('/update/:id', editPostById);
router.delete('/delete/:id', deletePostById)



export default router