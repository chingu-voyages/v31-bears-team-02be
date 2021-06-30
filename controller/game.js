const gameModel = require('../dao/game');
const userGameModel = require('../dao/userGame');

class GameController {
	async createGame(req, res) {
		try {
			
			// deconstruct / get userId out of request
			const { userId, artworks } = req.body					// artworks == [ ints ]

			// what is app? / what is db? 
			const db = req.app.get('db');

			// create new game obj in db
			const game = await gameModel.createGame(db, artworks);

			// create new user_game obj in db. Why do model methods have to take in db?
			const userGame = await userGameModel.createUserGame(db, userId, gameId);

			// send gameId back to front end
			res.status(201).json(game.game_id);						// ? correct key?

		} catch (err) {
			console.log(err);
		}
	}
}

module.exports = new GameController();