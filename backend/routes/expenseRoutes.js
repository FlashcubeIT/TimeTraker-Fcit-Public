import express from 'express';
import { createExpense, editExpense, filterUserExpense,submitAll, deleteAll, sendExpenseQBTOTT,  sendToQbUpdateExpense,getAllAproveExpenseForSync, getUsersSubmitedExpense, getExpensePhotoById,allSubmitedExpense,submitExpense,aproveExpense, getUsersExpress , getAllUsersExpress, deletedExpenseController} from "../controllers/expenseController.js";
import {userProtect} from "../middleware/authMiddleware.js"

const router = express.Router();


router.post('/add-expense',userProtect, createExpense)
router.get('/user-expense',userProtect, getUsersExpress)
router.get('/submit-expense',userProtect, submitExpense)
router.get('/aprove-expense',userProtect, aproveExpense)
router.get('/all-submited-expense',userProtect, allSubmitedExpense)
router.get('/all-expense',userProtect, getAllUsersExpress)
router.delete('/delete-expense',userProtect, deletedExpenseController)
router.get('/photo/:expenseId', getExpensePhotoById)
router.get('/user-submited-expense',userProtect,getUsersSubmitedExpense);
router.route('/sendToQb-expense').get(userProtect,sendToQbUpdateExpense);
router.get('/all-aproved-expense-for-sync',userProtect, getAllAproveExpenseForSync)
router.post('/send-expense-qb-to-tt',userProtect, sendExpenseQBTOTT)


router.route('/submitAll-expense').get(userProtect, submitAll);
router.route('/deleteAll-expense').get(userProtect, deleteAll);

router.route('/filter-user-expense').post( userProtect,filterUserExpense);

router.route('/edit-expense').post(userProtect, editExpense);

export default router;