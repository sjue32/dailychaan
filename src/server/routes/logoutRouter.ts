import express, { Request, Response } from 'express';
import sessionController from '../controllers/sessionController';

const logoutRouter = express.Router();

logoutRouter.get('/:username', sessionController.endSession, (req: Request, res: Response) => {
  res.status(201).json({ message: res.locals.message });
});

export default logoutRouter;