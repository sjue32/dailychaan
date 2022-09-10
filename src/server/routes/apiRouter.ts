import * as express from 'express';
import postsRouter from './postsRouter';
import usersRouter from './usersRouter';
import '@types/pg';


const apiRouter = express.Router();
apiRouter.use('/posts', postsRouter);
apiRouter.use('/users', usersRouter);

export default apiRouter;