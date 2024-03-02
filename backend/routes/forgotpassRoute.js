// this file is to handel user routs in backend 
import express from 'express';
import { varifyEmailForForgotPass, managerForgotPass, subAdminForgotPass, userForgotPass, AdminForgotPass} from '../controllers/ForgotpassController.js';
import {userProtect} from "../middleware/authMiddleware.js"


const router = express.Router();

// register route 
router.route('/forgotpass-varifyEmail').post(varifyEmailForForgotPass);
router.route('/manager-forgot-pass').post(managerForgotPass);
router.route('/sub-admin-forgot-pass').post(subAdminForgotPass);
router.route('/user-forgot-pass').post(userForgotPass);
router.route('/admin-forgot-pass').post(AdminForgotPass);

export default router;


