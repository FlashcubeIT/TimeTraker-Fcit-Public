import { createQuickbooksToken , getQuickbooksToken, deleteQuickbooksToken} from "../controllers/quickbooksTokenController.js";
import express from 'express';
import {userProtect} from "../middleware/authMiddleware.js"

const router = express.Router();


// router.post('/create-project', userProtect, createProject)
router.post('/update-qb-token', createQuickbooksToken)
router.get('/get-qb-token', getQuickbooksToken)
router.get('/delete-qb-token', userProtect, deleteQuickbooksToken)

export default router;
