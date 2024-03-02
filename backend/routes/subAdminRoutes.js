// this file is to handel user routs in backend 
import express from 'express';
import { registerSubAdmin, loginSubAdmin, getAllsubAdmin, deleteSubAdmin } from '../controllers/subAdminController.js'
import {userProtect} from "../middleware/authMiddleware.js"

const router = express.Router();

// register route 
router.route('/sub-asmin-register').post(registerSubAdmin);

router.route('/sub-asmin-login').post(loginSubAdmin);
router.get("/all-sub-asmin", userProtect,  getAllsubAdmin)
router.delete("/delete-sub-asmin", userProtect,  deleteSubAdmin)

export default router;


