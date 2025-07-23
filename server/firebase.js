import admin from 'firebase-admin';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filepath = `${__dirname}/certs/soma-tracker-firebase-adminsdk-fbsvc-b0d7b7669b.json`;
const serviceAccount = JSON.parse(fs.readFileSync(filepath));

if (!admin.apps.length) {
	admin.initializeApp({
		credential: admin.credential.cert(serviceAccount),
	});
}

export default admin;
