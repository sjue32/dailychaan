import express, { Request, Response, NextFunction, RequestHandler } from 'express';
import path from 'path';
import morgan from 'morgan';
import { ServerError } from '../types';
import apiRouter from './routes/apiRouter';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(morgan('tiny'));

// condition: NODE_ENV is production, serve static files
if(process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, '../../dist')));
}

// Is this redundant? Webpack dev server proxy pointed to root is redundant?
// app.get('/', (req, res) => res.status(200).sendFile(path.join(__dirname, '../client/index.html')));

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


// 404 handler
app.use('*', (req: Request, res: Response) => {
  console.log('Error: Client attempted access to unknown route!');
  return res.status(404).sendFile(path.resolve(__dirname, '../client/404error.html'));
});

// global error handler
app.use('/', (err: ServerError, req: Request, res: Response, next: NextFunction) => {
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