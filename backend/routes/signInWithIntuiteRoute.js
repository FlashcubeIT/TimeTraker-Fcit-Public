// this file is to handel user routs in backend 
import express from 'express';
import { findRealmId } from '../controllers/signInWithIntuiteController.js';
import {userProtect} from "../middleware/authMiddleware.js"

const router = express.Router();

// register route 
router.route('/sign-in-with-intuite').get(findRealmId);


export default router;


