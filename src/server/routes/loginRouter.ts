import express, { Request, Response, NextFunction } from 'express';
import usersController from '../controllers/usersController';

const loginRouter = express.Router();

// login user
loginRouter.post('/', usersController.verifyUser, (req: Request, res: Response, next: NextFunction) => {
  res.status(201).json({ message: res.locals.message, user_posts: res.locals.user_posts });
});

export default loginRouter;