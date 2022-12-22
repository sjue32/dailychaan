import { Request, Response, NextFunction } from 'express';
import { ddbDocClient } from '../../../libs/ddbDocClient';
import { QueryCommand, PutCommand, UpdateCommand, DeleteCommand, GetCommand } from '@aws-sdk/lib-dynamodb';

// Middleware controller making all queries to user_posts tables in DynamoDB
const postsController = {
  // get all posts from public profile of Daily Chaan
  getPublicPosts: async (req: Request, res: Response, next: NextFunction) => {
    try {
      // console.log('inside of getPublicPosts');
      // console.log('testing, req.body.test: ', req.body.test, 'table_name: ', req.body.table_name);
      const { table_name } = req.body;
      const params = {
        TableName: table_name,
        KeyConditionExpression: 'user_id = :user_id',
        ExpressionAttributeValues: {
          ':user_id': 1,
        },
      };
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
      };
      return next(errObj);
    }
  },
  // query for all posts/single post from a specific user
  getUserPosts: async (req: Request, res: Response, next: NextFunction): Promise<unknown> => {
    if(req.body.getOnePost) {
      try {
        const { table_name, timestamp } = req.body;
        const user_id = Number(req.params.user_id);        

        const params = {
          TableName: table_name,
          Key: {
            user_id: user_id,
            timestamp: timestamp,
          },
        };

        const response = await ddbDocClient.send(new GetCommand(params));
        const data = response.Item;
        res.locals = data;
        console.log('inside getOnePost: ', res.locals);
        return next();

      } catch(err) {
        const errObj = {
          log: `postsController.getUserPosts for getOnePost : ERROR : ${err}`,
          status: 404,
          message: { err: 'postsController.getUserPosts for getOnePost: ERROR: Check server logs for details'}
        };
        return next(errObj);
      }

    } else {
      try {
        const { table_name } = req.body;
        const user_id = Number(req.params.user_id);
  
        // console.log('inside postsControler.getUserPosts: user_id: ', user_id, 'typeof: ', typeof user_id);

        const params = {
          TableName: table_name,
          KeyConditionExpression: 'user_id = :user_id',
          ExpressionAttributeValues: {
            ':user_id': user_id,
          },
        };
        const response = await ddbDocClient.send(new QueryCommand(params));

        const data = response.Items;
        // res.locals.user_posts = data;
        res.locals = {
          user_posts: data,
        };
        // console.log('inside getUserPosts: ', data);
        return next();
  
      } catch(err) {
        const errObj = {
          log: `postsController.getUserPosts : ERROR : ${err}`,
          status: 404,
          message: { err: 'postsController.getUserPosts: ERROR: Check server logs for details'}
        };
        return next(errObj);
      }

    }

  },

  // add a single post for a specific user
  addUserPost: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { table_name, url, caption } = req.body;
      const user_id = Number(req.params.user_id);
      const likes = 0;
      // need time stamp string to act as sortKey
      const dateObj = new Date();
      const timestamp = dateObj.toISOString();
      const params = {
        TableName: table_name,
        Item: {
          user_id: user_id,
          timestamp: timestamp,
          url: url,
          caption: caption,
          likes: likes,
          likesData: {},
        },
        ReturnValues: 'ALL_OLD',
      };

      const response = await ddbDocClient.send(new PutCommand(params));
      const data = response.Attributes;
      if(data == undefined) {
        res.locals = {
          message: 'Item added',
          key: {
            user_id: user_id,
            timestamp: timestamp,
          },
        };
      }
      else {
        res.locals = { 
          message: 'Item already exists, item updated.'
        };
      }
      return next();

    } catch(err) {
      const errObj = {
        log: `postsController.addUserPost : ERROR : ${err}`,
        status: 400,
        message: { err: 'postsController.addUserPost: ERROR: Check server logs for details'}
      };
      return next(errObj);
    }

  },
  // update a single post for a specific user 
  updateUserPost: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { table_name, user_id, timestamp, caption }  = req.body;

      const params = {
        TableName: table_name,
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
      console.log('ERROR in updateUserPost: ', err);
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
      const { table_name, timestamp } = req.body;
      // initialize user_id from req.body and convert to Number
      const user_id = Number(req.body.user_id);
      // declare params
      const params = {
        TableName: table_name,
        Key: {
          user_id: user_id,
          timestamp: timestamp,
        },
        ReturnValues: 'ALL_OLD',
      };
      const response = await ddbDocClient.send(new DeleteCommand(params));
      // store deletedItem at res.locals.deletedItem
      const { Attributes } = response;
      res.locals = Attributes;

      return next();

    } catch(err) {
      console.log('ERROR: deleteUserPost: ', err);
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