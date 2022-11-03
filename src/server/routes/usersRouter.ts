import express, { Request, Response, NextFunction } from 'express';
import usersController from '../controllers/usersController';
import tableNameController from '../controllers/tableNameController';

const usersRouter = express.Router();

usersRouter.get('/:table', tableNameController.assignUsers, usersController.getUsers, (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json(res.locals);
});


export default usersRouter;