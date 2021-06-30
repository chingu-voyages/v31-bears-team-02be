import knex from 'knex';
import config from '../config';
import game from '../controller/game';


// Game Data Access Object (used to interface w/ db)
class GameDAO {

	gamesTable = 'games';

	// /**
	//  * Create new game obj in DB with userId
	//  * @param {knex} db - knex db connection object
	//  * @param {array} artworks - array of integers that refer to artworkIds from MET API
	//  * @returns {Promise<{
	//  * game_id: integer (refers to primary key in game table)
	//  * }>} Promise that resolves to the created game from db
	//  */
	async createGame(db, artworks) {

		const total_score = 0;

		// destructure game after creating new game
		const [ game ] = await db('game')				// ? singular even though table name plural?
			.insert({ 														// knex syntax
				total_score,
				artworks
			})
			.into(this.gamesTable)
			.returning('*');

		return game;													
	}


	// /**
	//  * Create new game obj in DB with userId
	//  * @param {knex} db - knex db connection object
	//  * @param {int} userId - foreign key
	//  * @param {int} gameId - foreign key
	//  * @param {real} updatedStotalScore - new game score (ex. 9/10 = .9)
	//  * @returns {Promise<{
	//  * game_id: integer (refers to primary key in game table)
	//  * }>} Promise that resolves to the updated game from db
	//  */
	async updateGame(db, userId, gameId, updatedStotalScore) {
		
		// TODO: knex syntax for updating db entry
		const [ game ] = await db('game')
			.where({id: gameId})
			.update({
				total_score: updatedStotalScore
			})

		return game;
	}
}


export default new GameDAO();