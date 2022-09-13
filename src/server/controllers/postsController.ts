import express, { Request, Response, NextFunction } from 'express';
// import db model
import db from '../db/db_model';

const postsController = {
  getPosts: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const sqlString = 'SELECT url, caption, user_id, date, likes FROM users JOIN users ON users._id = posts.user_id WHERE users._id = $1';
      const params = [1];
      const response = await db.query(sqlString, params);
      // process response
      const data = response.rows;
      res.locals = data;

      return next();
  
    } catch(err) {
      // use error template
      // pass new error object to global error handler with next
      return next(err);
    }
  }
};

export default postsController;
