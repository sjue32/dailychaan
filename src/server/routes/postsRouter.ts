import express, { Request, Response, NextFunction } from 'express';
import postsController from '../controllers/postsController';

const postsRouter = express.Router();

postsRouter.get('/', postsController.getPosts, (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json(res.locals);
});


// route CRUD requests to postsController


export default postsRouter;