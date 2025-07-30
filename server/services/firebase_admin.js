import admin from 'firebase-admin';
import fs from 'fs';
import { globalVariables } from '../globals.js';

const filepath = `${globalVariables.ROOT_FOLDER}/soma-tracker-firebase-adminsdk-fbsvc-b0d7b7669b.json`;
const serviceAccount = JSON.parse(fs.readFileSync(filepath));

if (!admin.apps.length) {
	admin.initializeApp({
		credential: admin.credential.cert(serviceAccount),
	});
}

export default admin;
