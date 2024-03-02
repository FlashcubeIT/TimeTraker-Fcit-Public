// this file is to handel user routs in backend 
import express from 'express';
import { createTask, getAllTask, deleteTask, editTask } from '../controllers/taskController.js';
import {userProtect} from "../middleware/authMiddleware.js"

const router = express.Router();

// register route 
router.route('/create-task').post(userProtect, createTask);

router.get('/all-task' , userProtect, getAllTask );

router.delete('/delete-task', userProtect, deleteTask );

router.route('/edit-task').post(userProtect, editTask);

export default router;


