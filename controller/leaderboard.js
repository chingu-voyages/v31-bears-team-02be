const gameModel = require('../dao/game');
const userGameModel = require('../dao/userGame');


class LeadeboardController {
	async getLeaderboard(req, res) {
		try {
			
			// TODO
			// need knex query to 
			//	- for each user, grab their total score, then sort highest to lowest
		
			const leaderboard = null;

			res.status(201).json(leaderboard);						

		} catch (err) {
			console.log(err);
		}
	}
}

module.exports = new LeadeboardController();