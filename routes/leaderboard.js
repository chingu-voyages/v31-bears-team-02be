const express = require('express');
const LeaderboardController = require('../controller/leaderboard');

// Router for /leaderboard endpoint
const leaderboardRouter = express.Router();


// Here '/' means the root of path 'leaderboard/'
leaderboardRouter.route('/')
  .get(express.json(), LeaderboardController.getLeaderboard);


module.exports = leaderboardRouter;