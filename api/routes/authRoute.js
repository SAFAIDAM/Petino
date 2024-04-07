import express from 'express';
import { signup } from '../controllers/authControllers.js';
import { login, google, Logout} from '../controllers/authControllers.js';

const router = express.Router();


router.post('/signup', signup)
router.post('/login', login)
router.post('/google', google);
router.get('/logout', Logout);




export default router