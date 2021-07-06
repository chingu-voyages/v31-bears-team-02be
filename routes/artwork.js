const ArtworkController = require("../controller/artwork");

const express = require("express");

// Router for /artwork endpoint
const artworkRouter = express.Router();
// Here '/' means the root of path 'artwork/'
artworkRouter.route("/departments").get((req, res, next) => ArtworkController.handleRequests(req, res, next));

//artworkRouter.route("/department")

module.exports = artworkRouter;
