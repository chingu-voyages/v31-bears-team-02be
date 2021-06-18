// server.js
//
require(dotenv).config();
import path from 'path';
import express from 'express';
import knex from 'knex';
const router = require('./routes');

const PORT = process.env.HTTP_PORT || 4001;
// const PORT = process.env.PORT || 4001;
const app = express();

app.set('db', knex({
	client: 'pg',
	connection: {
		database: process.env.RDS_DB_NAME,        
		user:     process.env.RDS_USERNAME,
		password: process.env.RDS_PASSWORD,
		port: process.env.RDS_PORT,
		host: process.env.RDS_HOSTNAME
	},
}));

app.use(express.static(path.join(__dirname, 'frontend', 'build')));


app.get('/', (req, res) => {
  res.send('just gonna send it');
});


app.get('/flower', (req, res) => {
  res.json({
    name: 'Dandelion',
    colour: 'Blue-ish',
		test: req.app.get('db').select('*')
  });
});


app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}.`);
});


// express.json() is a built-in middleware, parses incoming JSON requests, returns Object
app.use(express.json());
app.use(router);