import { Request, Response, NextFunction } from 'express';
import { ddbDocClient } from '../../../libs/ddbDocClient';
import { PutCommand, GetCommand } from '@aws-sdk/lib-dynamodb';
// QueryCommand, UpdateCommand, DeleteCommand
import bcrypt from 'bcrypt';

// Middleware controller making all queries to user_data table in DynamoDB
const usersController = {
  // get list of all user data for the Explore Section of Daily Chaan
  getUsers: async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log('inside usersController.getUsers middleware');
      const { table_name } = req.body;
      const user_info = 'main_users';

      const params = {
        TableName: table_name,
        Key: {
          user_info: user_info,
        },
      };

      const response = await ddbDocClient.send(new GetCommand(params));
      // console.log('inside usersController: response: ', response);
      // console.log('inside usersController: response.Item: ', response.Item);

      const data = response.Item.user_list;
      res.locals = data;
      // console.log('inside usersController.getUsers: data: ', data);
      return next();

    } catch (err) {
      const errObj = {
        log: `usersController.getUsers: ERROR : ${err}`,
        status: 404,
        message: { err: 'usersController.getUser: ERROR: Check server logs for details'}
      };
      return next(errObj);
    }
  },
  verifyUser: async (req: Request, res: Response, next: NextFunction) => {
    try{
      // username and password
      const { username, password } = req.body;
      console.log('username: ', username, ', password: ', password);
      // make call to DDB passwords table using username
      const params = {
        TableName: 'passwords',
        Key: {
          username: username,
        },
      };
  
      const response = await ddbDocClient.send(new GetCommand(params));
      console.log('response from getCommand to DBB inside verifyUser: ', response);
      // if username doesn't exist, send back generic message to client
      const data = response.Item;
      if(data == undefined) {
        res.locals = { message: 'username does not exist'};
        // send response to client
        return res.status(401).json({ message: res.locals.message });
      }
      const storedHashedPassword = data.password;
      console.log('storedHashedPassword: ', storedHashedPassword);
    
      // otherwise, compare stored hashed password to hashed client password using bcrypt
      const comparison = await bcrypt.compare(password, storedHashedPassword);
      // if it doesn't match, send back generic message to client
      if(!comparison) {
        console.log('Password does not match');

        res.locals.message = 'username / password does not match' ;
        // send response to client
        return res.status(401).json({ message: res.locals.message });
      }
      else {
        // otherwise, retrieve user data and save to req.body
        // create session - pass to sessionController
        // send cookie with sessionId and user data back to client
        console.log('successful login');
        res.locals.message = 'user verified';
        const { user_id, fav_users } = data;

        res.locals.user_data = {
          user_id,
          username,
          fav_users,
        };

        console.log('inside verifyUser, res.locals: ', res.locals);

        req.params = {
          user_id: user_id.toString(),
          username,
        };

        console.log('req.params in verifyUser: ', req.params);
      }
      
      return next();

    } catch(err) {
      const errObj = {
        log: `usersController.verifyUser : ERROR : ${err}`,
        status: 400,
        message: { err: 'usersController.verifyUser: ERROR: Check server logs for details'}
      };
      return next(errObj);
    }
  },

  createUser: async (req: Request, res: Response, next: NextFunction) => {
    try{
      const { email, username, password } = req.body;
      // check if username or email already exists
      const paramsUserNameCheck = {
        TableName: 'passwords',
        Key: {
          username: username,
        },
      };
  
      const checkUsernameResponse = await ddbDocClient.send(new GetCommand(paramsUserNameCheck));
      console.log('response from getCommand to DBB inside verifyUser: ', checkUsernameResponse);
      const check = checkUsernameResponse.Item;
      console.log('check', check);
      // if username/email already exists, send response, client should display message that username/email exists 
      if(check) {
        // res.locals = { message: 'user already exists' };
        res.locals.message = 'user already exists';
        return next();
      }
      else {
        console.log('email: ', email, ', username: ', username, ', password: ', password );
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('hashedPassword', hashedPassword);
        // putItem request to DDB passwords table
        const params = {
          TableName: 'passwords',
          Item: {
            username: username,
            email: email,
            password: hashedPassword,
            fav_users: {},
          },
          ReturnValues: 'ALL_OLD',
        };
  
        const response = await ddbDocClient.send(new PutCommand(params));
        console.log(response);
        // add user_id (generate random UUID) and username to users table, main_users document
  
        // after successful creation, user will be sent to sessionController and cookieController
        res.locals.message = 'user successfully created';
        return next();

      }

    } catch(err) {
      const errObj = {
        log: `usersController.createUser : ERROR : ${err}`,
        status: 400,
        message: { err: 'usersController.createUser: ERROR: Check server logs for details'}
      };
      return next(errObj);
    }
    
  },
};

export default usersController;
