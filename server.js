// server.js
//
// Load enviroment variables using a .env file
require('dotenv').config();
// Utility modules
import path from 'path';
import fs from 'fs';
// Api framework and related modules
import express from 'express';
import logger from 'morgan';
import cors from 'cors';
// Database query builder
import knex from 'knex';

// Express Routes
import userRouter from './routes/user';

// Import globals from enviroment variables
import config from './config';
const {
	NODE_ENV, PORT, RDS_HOSTNAME, RDS_USERNAME, RDS_PASSWORD, RDS_PORT, RDS_DB_NAME
} = config;

//const router = require('./routes');
// Moved port variable initialization to config file
// const PORT = process.env.HTTP_PORT || 4001;
// const PORT = process.env.PORT || 4001;

// Create express object with name app
export const app = express();
/* Establish connection to database and save as property of 
express app with name 'db'. To access the database use 
'app.get('db')' or if inside 'app.use()' with 'req.app.get('db')' */
app.set('db', knex({
	client: 'pg',
	connection: {
		database: RDS_DB_NAME,
		user: RDS_USERNAME,
		password: RDS_PASSWORD,
		port: RDS_PORT,
		host: RDS_HOSTNAME
	},
}));

// Setup logger with formats for each enviroment ('common' for production and 'dev' for development)
app.use(logger((NODE_ENV === 'production') ? 'common' : 'dev', {
	// Skip logging when run in test enviroment
	skip: () => NODE_ENV === 'test',
}));

if (NODE_ENV === 'production') {
	// Append logging to file
	app.use(logger('common', {
		// create a write stream in append mode and log to file 'express-access.log'
		stream: fs.createWriteStream(path.join(__dirname, '..', '..', 'log', 'express-access.log'), { flags: 'a' })
	}))
} else {
	// Append logging to file
	app.use(logger('common', {
		// create a write stream in append mode and log to file 'access.log'
		// pwd in production is /var/app/current, set log file address to '../../log/' so access.log is saved in /var/log/
		stream: fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
	}))
}

// Handle cors
app.use(cors())

// Serve static files located in frontend/build
app.use(express.static(path.join(__dirname, 'frontend', 'build')));

// Testing routes
app.get('/', (req, res) => {
	res.send('just gonna send it');
});

app.get('/flower', (req, res) => {
	res.json({
		name: 'Dandelion',
		colour: 'Blue-ish',
	});
});

// API routes
app.use('/user', userRouter);

// Error handling
app.use((error, req, res, next) => {
	let response;
	if (NODE_ENV === 'production') {
		response = { error: error.message };
	} else {
		console.error(error);
		response = { error: error.message };
	}
	res.status(500).json(response);
});

app.listen(PORT, () => {
	console.log(`Server listening at port ${PORT}.`);
});


// express.json() is a built-in middleware, parses incoming JSON requests, returns Object
// app.use(express.json());
// app.use(router);