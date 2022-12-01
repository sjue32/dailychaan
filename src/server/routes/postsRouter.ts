import express, { Request, Response, NextFunction } from 'express';
import postsController from '../controllers/postsController';
import tableNameController from '../controllers/tableNameController';

const postsRouter = express.Router();

// route CRUD requests to tableNameController and postsController
postsRouter.get('/', tableNameController.assignPosts, postsController.getPublicPosts, (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json(res.locals);
});
postsRouter.get('/:user_id', tableNameController.assignPosts, postsController.getUserPosts, (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json(res.locals.user_posts);
});
postsRouter.post('/:user_id', tableNameController.assignPosts, postsController.addUserPost, (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json(res.locals);
});
postsRouter.patch('/:user_id', tableNameController.assignPosts, postsController.updateUserPost, (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json(res.locals);
});
postsRouter.delete('/:user_id', tableNameController.assignPosts, postsController.deleteUserPost, (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json(res.locals);
});

export default postsRouter;