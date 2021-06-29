const gameModel = require('../dao/game');

class GameController {
	async createGame(req, res) {
		try {
			
			const id = await gameModel.createGame(req.body);
			res.status(201).json(id);

		} catch (err) {
			console.log(err);
		}
	}
}

module.exports = new GameController();