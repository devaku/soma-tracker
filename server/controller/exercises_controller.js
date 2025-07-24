import express from 'express';
import { firestore } from '../services/firebase.js';
import responseBuilder from '../services/response_builder.js';

import {
	collection,
	addDoc,
	query,
	where,
	getDocs,
	deleteDoc,
	doc,
	deleteField,
} from 'firebase/firestore';

const router = express.Router();

function errorResponse(res, error, statusCode) {
	let finalResponse = responseBuilder(statusCode, {
		error_message: error.message,
		stack: error.stack,
	});

	res.status(statusCode).json(finalResponse);
}

// Insert an exercise

/**
 * 	exercises: [
			{
				id: 123,
				// ...API info
				name: 'Skiing, water skiing',
				calories_per_hour: 354,
				duration_minutes: 60,
				total_calories: 354,
			},
		],
 */

router.post('/', async (req, res) => {
	try {
		const { userId, exercises } = req.body;
		let insertedValues = [];

		const q = collection(firestore, 'users', userId, 'exercises');
		for (let x = 0; x < exercises.length; x++) {
			const docRef = await addDoc(q, exercises[0]);

			insertedValues.push({
				id: docRef.id,
				...exercises[0],
			});
		}

		let finalResponse = responseBuilder(
			201,
			insertedValues,
			'Successfully inserted the data!'
		);

		res.status(201).json(finalResponse);
	} catch (error) {
		errorResponse(res, error, 400);
	}
});

// Read all exercises
router.get('/', async (req, res) => {
	try {
		/**
		 * FYI: THIS IS NOT THE SECURE WAY OF DOING THIS
		 * DO NOT DO THIS. LOL
		 */

		const { userId } = req.query;

		const querySnapshot = await getDocs(
			collection(firestore, 'users', userId, 'exercises')
		);

		let exercises = [];
		querySnapshot.forEach((doc) => {
			exercises.push(doc.data());
		});

		let message;
		if (exercises.length > 0) {
			message = 'Sucessfully found data!';
		} else {
			message = 'No data found.';
		}

		let finalResponse = responseBuilder(200, exercises, message);
		res.status(200).json(finalResponse);
	} catch (error) {
		errorResponse(res, error, 500);
	}
});

// // READ user by id
// router.get('/:id', async (req, res) => {
// 	try {
// 		const doc = await usersCollection.doc(req.params.id).get();
// 		if (!doc.exists) {
// 			let finalResponse = responseBuilder(404, {}, 'User not found');
// 			return res.status(404).json(finalResponse);
// 		} else {
// 			let finalResponse = responseBuilder(
// 				200,
// 				{ id: doc.id, ...doc.data() },
// 				'User successfully found.'
// 			);
// 			res.status(200).json(finalResponse);
// 		}
// 	} catch (error) {
// 		errorResponse(res, error, 500);
// 	}
// });

// // UPDATE user
// router.put('/:id', async (req, res) => {
// 	try {
// 		const { first_name, last_name, exercises, meals } = req.body;
// 		await usersCollection
// 			.doc(req.params.id)
// 			.update({ first_name, last_name, exercises, meals });

// 		let finalResponse = responseBuilder(
// 			200,
// 			{},
// 			'User successfully updated.'
// 		);

// 		res.status(200).json(finalResponse);
// 	} catch (error) {
// 		errorResponse(res, error, 400);
// 	}
// });

// DELETE user
router.delete('/:id', async (req, res) => {
	try {
		const { userId } = req.query;
		const exerciseId = req.params.id;
		const databasePath = `users/${userId}/exercises/${exerciseId}`;

		await deleteDoc(doc(firestore, databasePath));

		let finalResponse = responseBuilder(
			200,
			{},
			'Data successfully deleted.'
		);
		res.status(200).send(finalResponse);
	} catch (error) {
		errorResponse(res, error, 400);
	}
});

export default router;
