// this file is to handel user routs in backend 
import express from 'express';
import {registerAdmin, superAdmin,loginAdmin, varifyEmail, registerAdminForSignInWithIntuite} from '../controllers/adminController.js'
import {userProtect} from "../middleware/authMiddleware.js"


const router = express.Router();

// register route 
router.route('/admin-varifyEmail').post(varifyEmail);
router.route('/admin-register').post(registerAdmin);

router.route('/admin-login').post(loginAdmin);
router.route('/super-admin').get(superAdmin);

router.route('/sign-in-with-intuite-admin-register').post(registerAdminForSignInWithIntuite);
export default router;


