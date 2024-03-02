// this file is to handel user routs in backend 
import express from 'express';
import { createTimesheet, editTimesheet, ImportTimesheet,filterUserTimesheet,  filterTimesheetByState,  submitWeeklyTimesheet, deleteAll, deleteWeeklyTimesheet, getWeeklyTimesheet, submitAll,  sendTimesheetToTimeTraker, sendToQbUpdate, getUsersTimesheet, allAprovedTimesheet, aproveTimesheet ,updateTimesheet,getUsersSubmitedTimesheet, lastSeven, getAllUsersTimesheet, allSubmitedTimesheet, deleteTimesheet , submitTimesheet} from '../controllers/timesheetController.js';
import {userProtect} from "../middleware/authMiddleware.js"

const router = express.Router();

// register route 
router.route('/create-timesheet-entry').post(userProtect,  createTimesheet);
router.route('/update-timesheet').post(userProtect, updateTimesheet);
router.route('/submit-timesheet').get(userProtect, submitTimesheet);
router.route('/aprove-timesheet').get(userProtect,  aproveTimesheet);

router.route('/all-submited-timesheet').get(userProtect,  allSubmitedTimesheet);
router.route('/all-aproved-timesheet').get(userProtect,  allAprovedTimesheet);
router.route('/sendToQb').get(userProtect, sendToQbUpdate);
router.route('/sendTimesheetToTimeTraker').post(userProtect,sendTimesheetToTimeTraker);

router.get('/user-Timesheet',userProtect,  getUsersTimesheet );
router.get('/user-submited-Timesheet', userProtect, getUsersSubmitedTimesheet );


router.get('/all-Timesheet' ,userProtect, getAllUsersTimesheet );

router.get('/last7-Timesheet' ,userProtect,  lastSeven );
router.delete('/delete-timesheet',userProtect,   deleteTimesheet );


router.route('/filter-user-timesheet').post(userProtect, filterUserTimesheet);
router.route('/submitAll-timesheet').get(userProtect, submitAll);
router.route('/deleteAll-timesheet').get( deleteAll);

router.route('/get-weekly-timesheet').post(userProtect, getWeeklyTimesheet);
router.route('/delete-weekly-timesheet').post(userProtect, deleteWeeklyTimesheet);
router.route('/submit-weekly-timesheet').post(userProtect, submitWeeklyTimesheet);

router.route('/all-Filtered-Timesheet').post(userProtect, filterTimesheetByState);

router.route('/import-timesheet').post(userProtect, ImportTimesheet);


//edit 


router.route('/edit-timesheet').post(userProtect, editTimesheet);


export default router;


