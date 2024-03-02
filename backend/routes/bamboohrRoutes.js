// this file is to handel user routs in backend 
import express from 'express';
import {sendEmployeeTTTOBH, getEmployeeBHTOTT}  from "../controllers/bambooEmployesync.js"
import { getTimesheetBHTOTT } from '../controllers/bambooTimesheet.js';
import {userProtect} from "../middleware/authMiddleware.js"


const router = express.Router();

// register route 
router.route('/send-employee-timetraker-to-bamboo').get( userProtect, sendEmployeeTTTOBH);
router.route('/get-employee-bamboo-to-timetraker').get( userProtect, getEmployeeBHTOTT);
router.route('/get-employee-timesheet-bamboo-to-timetraker').get( userProtect, getTimesheetBHTOTT);


export default router;


