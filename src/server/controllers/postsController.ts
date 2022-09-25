import express, { Request, Response, NextFunction } from 'express';
import { ddbDocClient } from '../../../libs/ddbDocClient';
import { QueryCommand, PutCommand, UpdateCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb';

// Middleware controller making all queries to user_posts tables in DynamoDB
const postsController = {
  // get all posts from public profile of Daily Chaan
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
  // query for all posts from a specific user
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

  // add a single post for a specific user
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
      const errObj = {
        log: `postsController.addUserPost : ERROR : ${err}`,
        status: 400,
        message: { err: 'postsController.addUserPost: ERROR: Check server logs for details'}
      }
      return next(errObj);
    }

  },
  // update a single post for a specific user 
  updateUserPost: async (req: Request, res: Response, next: NextFunction) => {
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

  // delete a single post for a specific user
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
      const response = await ddbDocClient.send(new DeleteCommand(params));
      // store deletedItem at res.locals.deletedItem
      const { Attributes } = response;
      res.locals = Attributes;

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

  // middleware function to assign user_posts to table_name property for user_posts-related requests
  assignTable: (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body.table_name = 'user_posts';
      return next();
    } catch(err) {
      console.log(err);
      // pass new error object to global error handler with next
      const errObj = {
        log: `postsController.getPosts : ERROR : ${err}`,
        status: 404,
        message: { err: 'postsController.assignTable: ERROR: Check server logs for details'}
      }
      return next(errObj);
    }
  }
};

export default postsController;