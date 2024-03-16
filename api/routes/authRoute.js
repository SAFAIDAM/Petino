import express from 'express';
import { signup } from '../controllers/authControllers.js';
import { login } from '../controllers/authControllers.js';

const router = express.Router();


router.post('/signup',  signup)
router.post('/login', login)



export default router