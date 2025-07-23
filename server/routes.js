import express from 'express';
const router = express.Router();

import debugController from './controller/debug_controller.js';
import usersController from './controller/users_controller.js';

router.use('/debug', debugController);
router.use('/users', usersController);

export default router;
