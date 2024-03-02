// this file is to handel user routs in backend 
import express from 'express';
import {registerUser,loginUser, getAllUser,createPassAndRegisterUserForQB, deleteUser} from '../controllers/userController.js'
import {userProtect} from "../middleware/authMiddleware.js"

const router = express.Router();

// register route 
router.route('/user-register').post(registerUser);
router.route('/user-register-for-QB').post(createPassAndRegisterUserForQB);

// router.route('/user-login').post(loginUser);
router.get("/all-users", userProtect,  getAllUser)
router.delete("/delete-user", userProtect,  deleteUser)

export default router;


