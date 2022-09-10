import * as express from 'express';
import postsRouter from './postsRouter';
import usersRouter from './usersRouter';
import '@types/pg';


const apiRouter = express.Router();
router.use('/posts', postsRouter);
router.use('/users', usersRouter);

export default apiRouter;