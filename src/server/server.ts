import express, { Request, Response, NextFunction, RequestHandler } from 'express';
// import { ServerError } from '../types';

const app = express();

app.use(express.json());

// serve routes

// global error handler

app.listen(3000, () => console.log('Server is listening on PORT 3000'));