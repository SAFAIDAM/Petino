import express from 'express';
import { forgotpassword, signup } from '../controllers/authControllers.js';
import { login } from '../controllers/authControllers.js';
import { resetPassword } from '../controllers/authControllers.js';

const router = express.Router();


router.post('/signup',  signup)
router.post('/login', login)
router.post('/forgotPassword', forgotpassword)
router.patch('/resetPassword/:token', resetPassword)



export default router