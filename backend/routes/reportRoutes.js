// this file is to handel user routs in backend 
import express from 'express';
import { getAllUsersTimesheetReport,getCompanyName, dateFilterForTimesheet, getAllUsersExpress, filteredTimesheet, filteredExpense } from '../controllers/ReportFilter.js';
import {userProtect} from "../middleware/authMiddleware.js"

const router = express.Router();



router.get('/all-timesheet-report', userProtect,  getAllUsersTimesheetReport);
router.get('/all-expense-report', userProtect,  getAllUsersExpress);
router.get('/date-filter-timesheet', userProtect, dateFilterForTimesheet);
router.get('/company-name', userProtect, getCompanyName);
router.post('/filtered-timesheet-report', userProtect, filteredTimesheet);
router.post('/filtered-expense-report',userProtect, filteredExpense);


export default router;


