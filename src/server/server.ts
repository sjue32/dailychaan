import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import morgan from 'morgan';
import { ServerError } from '../types';
import apiRouter from './routes/apiRouter';
import session from 'express-session';
import { createClient } from 'redis';
export type RedisClientType = ReturnType<typeof createClient>

import connect_redis from 'connect-redis';

const redisStore = connect_redis(session);
const redisClient = createClient({
  socket: { host: 'localhost', port: 6379 },
  legacyMode: true,
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

redisClient.connect()
  .then(res => console.log('Connected to Redis'));

redisClient.on('error', (err) => {
  console.log('Redis error: ERR: ', err);
});

redisClient.on('connect', (err) => {
  console.log('Connected to Redis successfully');
});

app.use(session({
  secret: 'secret-key',
  name:'Redis sessionID',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 10,
  },
  store: new redisStore({
    host: 'localhost',
    port: 6379,
    // @ts-expect-error because wrong type definitions of connect-redis
    client: redisClient,
  })
}));

app.use(morgan('tiny'));

// condition: NODE_ENV is production, serve static files
if(process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, '../../dist')));
}



// serve routes
app.use('/api', apiRouter);

// test error handler
app.get('/error', (req: Request, res: Response, next: NextFunction) => {
  return next({
    log: 'This is a test of global error handler',
    status: 418,
    message: { err: 'This is a test of global error handler'}
  });
});

// Is this redundant? Webpack dev server proxy pointed to root is redundant?
app.use('/*', (req, res) => {
  console.log('refreshing page or visting server route other than root endpoint');
  return res.status(200).sendFile(path.resolve(__dirname, '../../dist/index.html'));
});


// 404 handler
app.use('*', (req: Request, res: Response) => {
  console.log('Error: Client attempted access to unknown route!');
  return res.status(404).sendFile(path.resolve(__dirname, '../client/404error.html'));
});

// global error handler
app.use('/', (err: ServerError, req: Request, res: Response) => {
  const defaultErr: ServerError = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(3000, () => console.log('Server is listening on PORT 3000'));