import express from 'express';
import postsRouter from './postsRouter';
import usersRouter from './usersRouter';

const apiRouter = express.Router();
apiRouter.use('/posts', postsRouter);
apiRouter.use('/users', usersRouter);

export default apiRouter;