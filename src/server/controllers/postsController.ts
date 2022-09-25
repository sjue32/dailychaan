import express, { Request, Response, NextFunction } from 'express';
// import db model
import db from '../db/db_model';
// import DDB client
import { ddbDocClient } from '../../../libs/ddbDocClient';
import { QueryCommand, PutCommand, UpdateCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb';

const xpostsController = {
  // get posts from public chaan
  getPosts: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const sqlString = 'SELECT url, caption, user_id, date, likes FROM posts WHERE user_id = 1';
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

const postsController = {
  // get posts from user public chaan 
  getPublicPosts: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const params = {
        TableName: 'user_posts',
        KeyConditionExpression: 'user_id = :user_id',
        ExpressionAttributeValues: {
          ':user_id': 1,
        },
      }
      const response = await ddbDocClient.send(new QueryCommand(params));
      const data = response.Items;
      res.locals = data;

      return next();
  
    } catch(err) {
      console.log(err);
      // pass new error object to global error handler with next
      const errObj = {
        log: `postsController.getPosts : ERROR : ${err}`,
        status: 404,
        message: { err: 'postsController.getPosts: ERROR: Check server logs for details'}
      }
      return next(errObj);
    }
  },
  // getUserPosts - individual user's posts
  getUserPosts: async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const user_id = Number(req.params.user_id);
      const params = {
        TableName: 'user_posts',
        KeyConditionExpression: 'user_id = :user_id',
        ExpressionAttributeValues: {
          ':user_id': user_id,
        },
      }

      const response = await ddbDocClient.send(new QueryCommand(params));
      const data = response.Items;
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
      const { url, caption } = req.body;
      const user_id = Number(req.params.user_id);
      const likes = 0;
      // need time stamp string to act as sortKey
      const dateObj = new Date();
      const timestamp = dateObj.toISOString();
      const params = {
        TableName: 'user_posts',
        Item: {
          user_id: user_id,
          timestamp: timestamp,
          url: url,
          caption: caption,
          likes: likes,
        },
        ReturnValues: 'ALL_OLD',
      };

      const response = await ddbDocClient.send(new PutCommand(params));
      const data = response.Attributes;
      if(data == undefined) {
        res.locals = {
          message: 'Item added'
        };
      }
      else {
        res.locals = { 
          message: 'Item already exists, item updated.'
        }
      }
      return next();

    } catch(err) {
      // console.log('inside catch block of addUserPosts: ', err);
      const errObj = {
        log: `postsController.addUserPost : ERROR : ${err}`,
        status: 400,
        message: { err: 'postsController.addUserPost: ERROR: Check server logs for details'}
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
      const { user_id, timestamp, caption }  = req.body;

      const params = {
        TableName: 'user_posts',
        Key: {
          user_id: user_id,
          timestamp: timestamp,
        },
        UpdateExpression: 'SET caption = :caption',
        ExpressionAttributeValues: {
          ':caption': caption,
        },
        ReturnValues: 'ALL_NEW',
      };

      const response = await ddbDocClient.send(new UpdateCommand(params));
      const updatedItem = response.Attributes;
      res.locals = updatedItem;

      return next();
    } catch(err) {
      const errObj = {
        log: `postsController.updateUserPost : ERROR : ${err}`,
        status: 404,
        message: { err: 'postsController.updateUserPost: ERROR: Check server logs for details'}
      };

      return next(errObj);
     }
  },

  // deletePost - delete entire post - 204
  deleteUserPost: async (req: Request, res: Response, next: NextFunction) => {
    try {
      // destructure timestamp from req.body
      const { timestamp } = req.body;
      // initialize user_id from req.body and convert to Number
      const user_id = Number(req.body.user_id);
      // declare params
      const params = {
        TableName: 'user_posts',
        Key: {
          user_id: user_id,
          timestamp: timestamp,
        },
        ReturnValues: 'ALL_OLD',
      }
      // call ddbDocClient.send with DeleteCommand
      const response = await ddbDocClient.send(new DeleteCommand(params));
      // store deletedItem at res.locals.deletedItem
      const { Attributes } = response;
      res.locals = {
        deletedItem: Attributes,
      };

      return next();

    } catch(err) {
      const errObj = {
        log: `postsController.deleteUserPost : ERROR : ${err}`,
        status: 404,
        message: { err: 'postsController.deleteUserPost: ERROR: Check server logs for details'}
      };

      return next(errObj);
    }
  },
  // in future will also remove image from S3 bucket
};

export default postsController;