const express = require('express');

// create new router object, lets us use one nested router structure instead of multiple routes in server.js
const router = express.Router();

const UserController = require('../controller/user');
const GameController = require('../controller/game');

router.post('/user', UserController.createUser);

router.post('/game', GameController.createGame);


// TODO
// router.get('/leaderboard', );


// For Testing
router.get('/', (req, res) => {
	res.send('just gonna send it');
});
  

// For Testing
router.get('/flower', (req, res) => {
	res.json({
		name: 'Dandelion',
		colour: 'Blue-ish',
		// env: process.env, 		// for testing
		// port: PORT						// for testing
	});
});


module.exports = router;