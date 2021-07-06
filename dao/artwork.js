const knex = require("knex");

class ArtworkDao {
  artworksTable = "artworks";
  /**
   *
   * @param {knex.Knex} db
   * @param {string} column
   * @returns Distinct values with count for each group and array of ids
   */
  async getDistinctByColumn(db, column) {
    const values = await db.raw(
      "SELECT :column:, COUNT(*) as object_count FROM :table: GROUP BY :column:;",
      {
        column: column,
        table: this.artworksTable,
      }
    );
    const { rows } = values;
    return rows;
  }
  /**
   *
   * @param {knex.Knex} db
   * @param {string} column
   * @returns Distinct values with count for each group and array of ids
   */
  async getDistinctByColumnWithIds(db, column) {
    const values = await db.raw(
      "SELECT :column:, COUNT(*) as object_count, ARRAY_AGG(object_id) as object_ids FROM :table: GROUP BY :column:;",
      {
        column: column,
        table: this.artworksTable,
      }
    );
    const { rows } = values;
    return rows;
  }
  /**
   *
   * @param {knex.Knex} db
   * @param {string} column - department_name | object_end_date | artist_name | culture | country | artist_nationality
   * @param {string} department - Any of the departments
   * */
  async getDistinctFromDepartment(db, column, department) {
    const values = await db(this.artworksTable)
      .select(
        db.raw(
          ":column:, count(*) as object_count, ARRAY_AGG(object_id) as object_ids",
          {
            column: column,
          }
        )
      )
      .where("department_name", department)
      .groupBy(column);
    //.raw(
    //  `SELECT :column:, COUNT(*) as object_count,
    //   FROM :table:  GROUP BY :column:;`,
    //  {
    //    column: column,
    //  }
    //)
    //.where()
    return values;
  }
  /**
   *
   * @param {knex.Knex} db
   */
  async getIdsFromDepartment(db) {
    const values = await db(this.artworksTable).distinct(column);
  }
  /**
   *
   * @param {knex.Knex} db
   */
  async getDateMinMaxFromDepartment(db) {
    const values = await db(this.artworksTable).distinct(column);
  }
  /**
   *
   * @param {knex.Knex} db
   */
  async getIdsWithinRangeFromDepartment(db) {
    const values = await db(this.artworksTable).distinct(column);
  }
}

module.exports = new ArtworkDao();
