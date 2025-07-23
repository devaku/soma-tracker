import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
	res.json({
		status: 200,
		message: 'This is the debug route',
	});
});

export default router;
