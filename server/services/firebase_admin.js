import admin from 'firebase-admin';
import fs from 'fs';
import { globalVariables } from '../globals.js';

const filepath = `${globalVariables.ROOT_FOLDER}/certs/soma-tracker-firebase-cert.json`;
const serviceAccount = JSON.parse(fs.readFileSync(filepath));

if (!admin.apps.length) {
	admin.initializeApp({
		credential: admin.credential.cert(serviceAccount),
	});
}

export default admin;
