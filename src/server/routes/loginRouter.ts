import express, { Request, Response, NextFunction } from 'express';
import usersController from '../controllers/usersController';
import sessionController from '../controllers/sessionController';
import tableNameController from '../controllers/tableNameController';
import postsController from '../controllers/postsController';

const loginRouter = express.Router();

// check if user is still authorized, if not, log out
loginRouter.get('/:username', sessionController.isLoggedIn, (req: Request, res: Response) => {
  res.status(200).json({ message: res.locals.message });
});
// login user
// [X] verifyUser, then [x] startSession, [x] tableController, [x] getUserPosts
// [] then send back { message: 'user is verified, posts: [ ] }

loginRouter.post('/', usersController.verifyUser, sessionController.startSession, 
  tableNameController.assignPosts, postsController.getUserPosts, (req: Request, res: Response, next: NextFunction) => {
  res.status(201).json({ message: res.locals.message, user_posts: res.locals.user_posts, user_data: res.locals.user_data });
});

export default loginRouter;