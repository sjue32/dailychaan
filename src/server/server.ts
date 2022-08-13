import express, { Request, Response, NextFunction, RequestHandler } from 'express';
import path from 'path';


// import { ServerError } from '../types';

const app = express();

app.use(express.json());

// serve routes
// condition: NODE_ENV is production, serve static files
if(process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, '../../dist')));
}

// Is this redundant? WDS proxy pointed to root is redundant?
// app.get('/', (req, res) => res.status(200).sendFile(path.join(__dirname, '../client/index.html')));

// global error handler

app.listen(3000, () => console.log('Server is listening on PORT 3000'));