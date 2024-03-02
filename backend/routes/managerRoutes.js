// this file is to handel user routs in backend 
import express from 'express';
import { registerManager, loginManager, getAllManager, deleteManager } from '../controllers/managerController.js'
import {userProtect} from "../middleware/authMiddleware.js"

const router = express.Router();

// register route 
router.route('/manager-register').post(registerManager);

router.route('/manager-login').post(loginManager);
router.get("/all-manager", userProtect,  getAllManager)
router.delete("/delete-manager", userProtect, deleteManager)

export default router;


