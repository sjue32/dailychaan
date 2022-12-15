import express, { Request, Response } from 'express';
import usersController from '../controllers/usersController';

const signupRouter = express.Router();

signupRouter.post('/', usersController.createUser, (req: Request, res: Response) => {
  res.status(201).json(res.locals.message);
});

export default signupRouter;