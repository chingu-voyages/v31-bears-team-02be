const gameModel = require('../dao/game');
// const userGameModel = require('../dao/userGame');


class LeaderboardController {
	async getLeaderboard(req, res) {
		try {
			console.log('testing- leaderboard controller');

			const db = req.app.get('db');

			const leaderboard = await gameModel.getLeaderboard(db);
			
			res.status(201).json(leaderboard);						

		} catch (err) {
			console.log(err);
		}
	}
}

module.exports = new LeaderboardController();