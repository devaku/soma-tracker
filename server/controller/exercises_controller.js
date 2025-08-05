import express from 'express';
import admin from '../services/firebase_admin.js';
const db = admin.firestore();
import responseBuilder from '../services/response_builder.js';

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
		const exerciseCollection = db.collection(`users/${userId}/exercises`);

		for (let x = 0; x < exercises.length; x++) {
			let docRef = await exerciseCollection.add({
				...exercises[0],
			});

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
		const collectionRef = db.collection(`users/${userId}/exercises`);

		const querySnapshot = await collectionRef.get();

		// // Access documents directly from the 'docs' property of the QuerySnapshot
		// const documents = querySnapshot.docs;

		// // Or using map to transform into an array of data objects
		// const dataArray = documents.map((doc) => doc.data());
		// console.log('Array of document data:', dataArray);

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

// DELETE user
router.delete('/:id', async (req, res) => {
	try {
		const { userId } = req.query;
		const exerciseId = req.params.id;

		const documentRef = db
			.collection(`users/${userId}/exercises`)
			.doc(exerciseId);

		let response = await documentRef.delete().then(() => {});

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
