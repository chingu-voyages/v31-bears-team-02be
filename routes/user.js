import express from 'express';
import UserController from '../controller/user';

// Router for /user endpoint
const userRouter = express.Router();
// Here '/' means the root of path 'user/'
userRouter.route('/')
  .post(express.json(), UserController.createUser);

/*
userRouter.route('/auth')
  .post(express.json(), UserController.authenticateUser);
*/

export default userRouter;