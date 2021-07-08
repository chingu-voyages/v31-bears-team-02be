import express from 'express';
import LeaderboardController from '../controller/leaderboard';

// Router for /leaderboard endpoint
const leaderboardRouter = express.Router();


// Here '/' means the root of path 'leaderboard/'
leaderboardRouter.route('/')
  .get(express.json(), LeaderboardController.getLeaderboard);


export default leaderboardRouter;