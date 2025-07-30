import express from 'express';
const router = express.Router();

import debugController from './controller/debug_controller.js';
import usersController from './controller/users_controller.js';
import exercisesController from './controller/exercises_controller.js';
import mealsController from './controller/meals_controller.js';

router.use('/debug', debugController);
router.use('/users', usersController);
router.use('/exercises', exercisesController);
router.use('/meals', mealsController);

export default router;
