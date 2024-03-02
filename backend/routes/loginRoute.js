// this file is to handel user routs in backend 
import express from 'express';
import { loginUser, getUser } from '../controllers/loginController.js';
import {userProtect} from "../middleware/authMiddleware.js"

const router = express.Router();



router.route('/user-login').post(loginUser);
router.route('/get-user').get(getUser);


export default router;


