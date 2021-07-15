const express = require('express');
const GameController = require('../controller/game');


// Router for /game endpoint
const gameRouter = express.Router();


// Here '/' means the root of path 'game/'
gameRouter.route('/')
  .post(express.json(), GameController.createGame);

gameRouter.route('/update-game')
	.post(express.json(), GameController.updateGame);


module.exports = gameRouter;