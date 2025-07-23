import express from 'express';
const router = express.Router();

import debugController from './controller/debug_controller.js';

router.use('/debug', debugController);

export default router;
