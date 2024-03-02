// this file is to handel user routs in backend 
import express from 'express';
import { createAccount,getChartOfAccountByID,getActiveBankAccount, getChartOfAccount,getBankAccount, setBank } from '../controllers/accountController.js';
import {userProtect} from "../middleware/authMiddleware.js"


const router = express.Router();

// register route 
router.route('/create-account').post( userProtect, createAccount);
router.route('/update-account-profile').post( userProtect, setBank);

router.route('/get-chart-of-account-for-expense').get( userProtect, getChartOfAccount);
router.route('/get-bank-account').get( userProtect, getBankAccount);

router.route('/get-chart-of-account-by-id').post( userProtect, getChartOfAccountByID);
router.route('/get-active-bank').get( userProtect, getActiveBankAccount);

export default router;


