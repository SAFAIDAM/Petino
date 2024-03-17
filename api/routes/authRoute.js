import express from 'express';
import { signup } from '../controllers/authControllers.js';
import { login, google, logout } from '../controllers/authControllers.js';

const router = express.Router();


router.post('/signup', signup)
router.post('/login', login)
router.post('/google', google);
router.get('/logout', logout);


// router.post('/forgotPassword', forgotpassword)
// router.patch('/resetPassword/:token', resetPassword)


export default router