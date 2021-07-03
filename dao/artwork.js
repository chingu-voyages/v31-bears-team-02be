const knex = require("knex");

class ArtworkDao {
 artworksTable = "artworks";
 /**
  * 
  * @param {knex.Knex} db 
  * @param {string} column 
  */
  async getDistinctValuesByColumn(db, column) {
    const values = await db(this.artworksTable)
    .distinct(column);
  }
  /**
  * 
  * @param {knex.Knex} db  
  */
   async getDistinctArtistsFromDepartment(db) {
    const values = await db(this.artworksTable)
    .distinct(column);
  }
  /**
  * 
  * @param {knex.Knex} db  
  */
   async getDistinctArtistsFromDepartment(db) {
    const values = await db(this.artworksTable)
    .distinct(column);
  }
}

module.exports = new ArtworkDao();