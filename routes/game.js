const express = require('express');
const GameController = require('../controller/game');
const requireAuth = require('../middleware/jwt-auth')

// Router for /game endpoint
const gameRouter = express.Router();


// Here '/' means the root of path 'game/'
gameRouter.route('/')
  .all(requireAuth)
  .post(express.json(), GameController.createGame);

gameRouter.route('/update-game')
  .all(requireAuth)
	.post(express.json(), GameController.updateGame);


module.exports = gameRouter;