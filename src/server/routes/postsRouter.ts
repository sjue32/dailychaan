import express, { Request, Response, NextFunction } from 'express';
import postsController from '../controllers/postsController';

const postsRouter = express.Router();

// route CRUD requests to postsController
postsRouter.get('/', postsController.assignTable, postsController.getPublicPosts, (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json(res.locals);
});
postsRouter.get('/:user_id', postsController.assignTable, postsController.getUserPosts, (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json(res.locals);
});
postsRouter.post('/:user_id', postsController.assignTable, postsController.addUserPost, (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json(res.locals.message);
});
postsRouter.put('/:user_id', postsController.assignTable, postsController.updateUserPost, (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json(res.locals);
});
postsRouter.delete('/:user_id', postsController.assignTable, postsController.deleteUserPost, (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json(res.locals);
});

export default postsRouter;