const UserController = require("../controller/user");

const express = require("express");

// Router for /user endpoint
const userRouter = express.Router();
// Here '/' means the root of path 'user/'
userRouter.route("/").post(express.json(), UserController.createUser);
// This is route '/user/auth'
userRouter.route("/auth").post(express.json(), UserController.authenticateUser);

module.exports = userRouter;
