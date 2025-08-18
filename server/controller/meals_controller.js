import express from 'express';
import admin from '../services/firebase_admin.js';
const firestore = admin.firestore();
import responseBuilder from '../services/response_builder.js';

const router = express.Router();

function errorResponse(res, error, statusCode) {
	let finalResponse = responseBuilder(statusCode, {
		error_message: error.message,
		stack: error.stack,
	});
	res.status(statusCode).json(finalResponse);
}

// Insert a meal
/**
 *  meals: [
 *    {
 *      id: 123,
 *      // ...API info
 *      name: 'brisket',
 *      calories: 1312.3,
 *      serving_size_g: 453.592,
 *      fat_total_g: 82.9,
 *      fat_saturated_g: 33.2,
 *      protein_g: 132,
 *      sodium_mg: 217,
 *      potassium_mg: 781,
 *      cholesterol_mg: 487,
 *      carbohydrates_total_g: 0,
 *      fiber_g: 0,
 *      sugar_g: 0
 *    },
 *  ]
 */
router.post('/', async (req, res) => {
	try {
		console.log('Received POST /meals:', req.body);
		const { userId, meals } = req.body;
		let insertedValues = [];

		const mealsCollection = firestore
			.collection('users')
			.doc(userId)
			.collection('meals');
		for (let x = 0; x < meals.length; x++) {
			const docRef = await mealsCollection.add(meals[x]);

			// Attach the ID into the collection
			await mealsCollection.doc(docRef.id).update({ meal_id: docRef.id });

			insertedValues.push({
				id: docRef.id,
				...meals[x],
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

// Read all meals
router.get('/', async (req, res) => {
	try {
		const { userId } = req.query;
		const mealsCollection = firestore
			.collection('users')
			.doc(userId)
			.collection('meals');
		const snapshot = await mealsCollection.get();

		let meals = [];
		snapshot.forEach((doc) => {
			meals.push({ id: doc.id, ...doc.data() });
		});

		let message =
			meals.length > 0 ? 'Successfully found data!' : 'No data found.';
		let finalResponse = responseBuilder(200, meals, message);
		res.status(200).json(finalResponse);
	} catch (error) {
		errorResponse(res, error, 500);
	}
});

// Delete a meal
router.delete('/:id', async (req, res) => {
	try {
		const { userId } = req.query;
		const mealId = req.params.id;
		const mealDoc = firestore
			.collection('users')
			.doc(userId)
			.collection('meals')
			.doc(mealId);

		await mealDoc.delete();

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
