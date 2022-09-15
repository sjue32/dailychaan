import express, { Request, Response, NextFunction } from 'express';
// import db model
import db from '../db/db_model';

const postsController = {
  // get posts from public chaan
  getPosts: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const sqlString = 'SELECT url, caption, user_id, date, likes FROM users JOIN users ON users._id = posts.user_id WHERE users._id = 1';
      const response = await db.query(sqlString);
      const data = response.rows;
      res.locals = data;

      return next();
  
    } catch(err) {
      console.log(err);
      // pass new error object to global error handler with next
      const errObj = {
        log: `postsController.getUserPosts : ERROR : ${err}`,
        status: 404,
        message: { err: 'postsController.getUserPosts: ERROR: Check server logs for details'}
      }
      return next(errObj);
    }
  },
  // getUserPosts - individual user's posts
  getUserPosts: async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const string = 'SELECT url, caption, user_id, date, likes FROM users JOIN users ON users._id = \
      posts.user_id WHERE users._id = $1';
      const user_id = Number(req.params.user_id);
      const params = user_id;
      const response = await db.query(string, params);
      const data = response.rows;
      res.locals = data;
      return next();

    } catch(err) {
      // console.log(err);
      const errObj = {
        log: `postsController.getUserPosts : ERROR : ${err}`,
        status: 404,
        message: { err: 'postsController.getUserPosts: ERROR: Check server logs for details'}
      }
      return next(errObj);
    }
  },

  // addPost - 201 - POST REQUEST
  addUserPost: async (req: Request, res: Response, next: NextFunction) => {
    try {
      // const postData = req.body;
      const string = 'INSERT INTO posts (user_id, url, caption) VALUES ($1, $2, $3) RETURNING *';
      const user_id = Number(req.params.user_id);
      // const url = postData.url;
      // const caption = postData.caption;
      const { url, caption } = req.body;
      const params = [user_id, url, caption];
      const response = await db.query(string, params);

      const data = response.rows;
      // console.log(data[0]);
      // res.locals = response;
      return next();

    } catch(err) {
      // console.log('inside catch block of addUserPosts: ', err);
      const errObj = {
        log: `postsController.getUserPosts : ERROR : ${err}`,
        status: 404,
        message: { err: 'postsController.getUserPosts: ERROR: Check server logs for details'}
      }
      // console.log(errObj);
      return next(errObj);
    }

  },

  // updatePost - edit caption
  updateUserPost: async (req: Request, res: Response, next: NextFunction) => {
    // req.param for user_id - but we don't need to check it, can check it?
    // req.body: caption, user_id?, post_id - in DB it's _id?
    try {
      const string = 'UPDATE posts SET caption = $1 WHERE _id = $2 RETURNING *';
      const { post_id, caption }  = req.body;

      const params = [post_id, caption]; // update with correct var's
      const response = await db.query(string, params);
      res.locals = response.rows;

      return next();
    } catch(err) {
      const errObj = {
        log: `postsController.getUserPosts : ERROR : ${err}`,
        status: 404,
        message: { err: 'postsController.updateUserPost: ERROR: Check server logs for details'}
      };

      return next(errObj);
     }
  },

  // deletePost - delete entire post - 204
  deleteUserPost: async (req: Request, res: Response, next: NextFunction) => {

  },
  // in future will also remove image from S3 bucket
};

export default postsController;
