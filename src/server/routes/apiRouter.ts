import express from 'express';
import postsRouter from './postsRouter';
import usersRouter from './usersRouter';
import loginRouter from './loginRouter';
import signupRouter from './signupRouter';

const apiRouter = express.Router();
apiRouter.use('/posts', postsRouter);
apiRouter.use('/users', usersRouter);
apiRouter.use('/login', loginRouter);
apiRouter.use('/signup', signupRouter);

export default apiRouter;