import express, { Request, Response, NextFunction, RequestHandler } from 'express';
import path from 'path';


// import { ServerError } from '../types';

const app = express();

app.use(express.json());

// serve routes
// condition: NODE_ENV is production, serve the dist folder bundle js
// serve index.html??? as well???
if(process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, '../../dist')));
}
// global error handler

app.listen(3000, () => console.log('Server is listening on PORT 3000'));