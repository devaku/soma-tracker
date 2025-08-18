/**
 * LOAD THE ENVIRONMENTAL VARIABLES
 */

import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

/**
 * SETUP THE EXPRESS SERVER
 */

import express from 'express';
const app = express();
import path from 'path';
import { fileURLToPath } from 'url';
import { globalVariables } from './globals.js';

import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());
app.use(cors());

// Serve static files from Next.js build (out directory)
app.use(express.static(path.join(__dirname, '../out')));

// Serve static files from public folder
app.use(express.static(path.join(globalVariables.ROOT_FOLDER, 'public')));

// Set port
app.set('PORT', 8080);

// API ROUTES
import routes from './routes.js';
app.use('/api/v1', routes);

// Serve Next.js app for all other routes (catch-all)
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../out/index.html'));
});

app.listen(8080, () => {
	console.log(`Server is listening at localhost:${8080}`);
});
