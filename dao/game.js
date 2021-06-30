import knex from 'knex';
import config from '../config';


// Game Data Access Object (used to interface w/ db)
class GameDAO {

	gamesTable = 'games';

	// /**
	//  * Create new game obj in DB with userId
	//  * @param {knex} db - knex db connection object
	//  * @param {artworks} array - array of integers that refer to artworkIds from MET API
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
}


export default new GameDAO();