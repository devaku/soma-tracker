import express from 'express';
import admin from '../firebase.js';

const router = express.Router();
const db = admin.firestore();
const usersCollection = db.collection('users');

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
		const userRecord = await admin
			.auth()
			.createUser({
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
		res.status(201).json({
			id: userRecord.uid,
			email,
			first_name,
			last_name,
			exercises,
			meals,
		});
	} catch (error) {
		res.status(400).json({ error: error.message });
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
		res.json(users);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// READ user by id
router.get('/:id', async (req, res) => {
	try {
		const doc = await usersCollection.doc(req.params.id).get();
		if (!doc.exists)
			return res.status(404).json({ error: 'User not found' });
		res.json({ id: doc.id, ...doc.data() });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// UPDATE user
router.put('/:id', async (req, res) => {
	try {
		const { first_name, last_name, exercises, meals } = req.body;
		await usersCollection
			.doc(req.params.id)
			.update({ first_name, last_name, exercises, meals });
		res.json({ message: 'User updated' });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

// DELETE user
router.delete('/:id', async (req, res) => {
	try {
		await admin.auth().deleteUser(req.params.id);
		await usersCollection.doc(req.params.id).delete();
		res.json({ message: 'User deleted' });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

export default router;
