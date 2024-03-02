// this file is to handel user routs in backend 
import express from 'express';
import { sendContactMail } from '../controllers/sendContactMail.js';
import {userProtect} from "../middleware/authMiddleware.js"

const router = express.Router();



router.post('/sendContactMail', sendContactMail);



export default router;
