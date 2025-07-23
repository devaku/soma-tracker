/**
 * LOAD THE ENVIRONMENTAL VARIABLES
 */

import dotenv from 'dotenv';
dotenv.config();

/**
 * SETUP THE EXPRESS SERVER
 */

import express from 'express';
const app = express();
import path from 'path';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Templating
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'public/views'));

// Set port
app.set('PORT', process.env.EXPRESS_PORT);

// API ROUTES
import routes from './routes.js';
app.use('/api/v1', routes);

app.listen(process.env.EXPRESS_PORT, () => {
	console.log(`Server is listening at localhost:${process.env.EXPRESS_PORT}`);
});
