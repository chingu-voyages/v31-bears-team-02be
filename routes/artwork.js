const ArtworkController = require("../controller/artwork");

const express = require("express");

// Router for /artwork endpoint
const userRouter = express.Router();
// Here '/' means the root of path 'artwork/'
userRouter.route("/distinct/:columnName").get(ArtworkController.getDistinct);

module.exports = artworkRouter;
