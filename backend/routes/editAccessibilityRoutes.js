import express from 'express';
import  {updateSubAdminAccessibility,getUserAccessibility,getManagerAccessibility,getSubAdminAccessibility, updateManagerAccessibility, updateUserAccessibility} from "../controllers/editaccessibility.js";
import {userProtect} from "../middleware/authMiddleware.js"

const router = express.Router();


router.post('/update-sub-admin-accessibility' , userProtect, updateSubAdminAccessibility)
router.post('/update-manager-accessibility' , userProtect, updateManagerAccessibility)
router.post('/update-user-accessibility' , userProtect, updateUserAccessibility)
router.get('/get-accessibility-user' ,userProtect,  getUserAccessibility)
router.get('/get-accessibility-manager' ,userProtect,  getManagerAccessibility)
router.get('/get-accessibility-sub-admin' ,userProtect,  getSubAdminAccessibility)

export default router;