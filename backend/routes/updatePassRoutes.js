// this file is to handel user routs in backend 
import express from 'express';
import {AdminUpdatePass, userUpdatePass, subAdminUpdatePass, managerUpdatePass} from '../controllers/updatePassController.js'

const router = express.Router();


router.post('/admin-update-pass',  AdminUpdatePass)
router.post('/sub-admin-update-pass',  userUpdatePass)
router.post('/manager-update-pass', subAdminUpdatePass)
router.post('/user-update-pass', managerUpdatePass)


export default router;
