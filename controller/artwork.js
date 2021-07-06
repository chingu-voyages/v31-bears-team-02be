const ArtworkModel = require("../dao/artwork");

class ArtworkController {
  constructor() {
    this.handleRequests = this.handleRequests.bind(this);
  }
  async handleRequests(req, res, next) {
    const { q } = req.query;
    switch (q) {
      case "artists":
      return this.getArtistsFromDepartment(req, res, next);
      default:
      return this.getDepartments(req, res, next);
    }
  }
  async getDepartments(req, res, next) {
    const db = req.app.get("db");
    try {
      const departments = await ArtworkModel.getDistinctByColumn(
        db,
        "department_name"
      );
      res.json(departments);
    } catch (error) {
      next(error);
    }
  }
  async getArtistsFromDepartment(req, res, next) {
    const db = req.app.get("db");
    const { department } = req.query;
    try {
      const artists = await ArtworkModel.getDistinctFromDepartment(
        db,
        "artist_name",
        department
      );
      res.json(artists);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ArtworkController();
