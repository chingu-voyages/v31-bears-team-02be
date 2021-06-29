import express from 'express';
import GameController from '../controller/game';

// Router for /game endpoint
const gameRouter = express.Router();


// Here '/' means the root of path 'game/'
gameRouter.route('/')
  .post(express.json(), GameController.createGame);


export default gameRouter;