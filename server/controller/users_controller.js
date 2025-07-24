import express from 'express';
import admin from '../services/firebase.js';
import responseBuilder from '../services/response_builder.js';

const router = express.Router();
const db = admin.firestore();
const usersCollection = db.collection('users');

function errorResponse(res, error, statusCode) {
	let finalResponse = responseBuilder(statusCode, {
		error_message: error.message,
		stack: error.stack,
	});

	res.status(statusCode).json(finalResponse);
}

// CREATE user
router.post('/', async (req, res) => {
	try {
		const {
			email,
			password,
			first_name,
			last_name,
			exercises = [],
			meals = [],
		} = req.body;
		// Create user in Firebase Auth
		const userRecord = await admin.auth().createUser({
			email,
			password,
			displayName: `${first_name} ${last_name}`,
		});
		// Add user profile to Firestore
		await usersCollection.doc(userRecord.uid).set({
			first_name,
			last_name,
			email,
			exercises,
			meals,
		});

		let finalResponse = responseBuilder(201, {
			id: userRecord.uid,
			email,
			first_name,
			last_name,
			exercises,
			meals,
		});

		res.status(201).json(finalResponse);
	} catch (error) {
		errorResponse(res, error, 400);
	}
});

// READ all users
router.get('/', async (req, res) => {
	try {
		const snapshot = await usersCollection.get();
		const users = snapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}));

		let finalResponse = responseBuilder(
			200,
			users,
			'Sucessfully found users!'
		);
		res.status(200).json(finalResponse);
	} catch (error) {
		errorResponse(res, error, 500);
	}
});

// READ user by id
router.get('/:id', async (req, res) => {
	try {
		const doc = await usersCollection.doc(req.params.id).get();
		if (!doc.exists) {
			let finalResponse = responseBuilder(404, {}, 'User not found');
			return res.status(404).json(finalResponse);
		} else {
			let finalResponse = responseBuilder(
				200,
				{ id: doc.id, ...doc.data() },
				'User successfully found.'
			);
			res.status(200).json(finalResponse);
		}
	} catch (error) {
		errorResponse(res, error, 500);
	}
});

// UPDATE user
router.put('/:id', async (req, res) => {
	try {
		const { first_name, last_name, exercises, meals } = req.body;
		await usersCollection
			.doc(req.params.id)
			.update({ first_name, last_name, exercises, meals });

		let finalResponse = responseBuilder(
			200,
			{},
			'User successfully updated.'
		);

		res.status(200).json(finalResponse);
	} catch (error) {
		errorResponse(res, error, 400);
	}
});

// DELETE user
router.delete('/:id', async (req, res) => {
	try {
		await admin.auth().deleteUser(req.params.id);
		await usersCollection.doc(req.params.id).delete();

		let finalResponse = responseBuilder(
			200,
			{},
			'User successfully deleted.'
		);
		res.status(200).send(finalResponse);
	} catch (error) {
		errorResponse(res, error, 400);
	}
});

export default router;
