// this file is to handel user routs in backend 
import express from 'express';
import { createProject, getAllProject, deletedProjectController, editProject } from '../controllers/projectController.js';
import {userProtect} from "../middleware/authMiddleware.js"

const router = express.Router();


router.post('/create-project', userProtect, createProject)
router.get('/all-project', userProtect, getAllProject);
router.delete('/delete-project', userProtect, deletedProjectController);

router.route('/edit-project').post(userProtect, editProject);

export default router;


