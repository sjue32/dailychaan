import express, { Request, Response, NextFunction, RequestHandler } from 'express';
import path from 'path';
import db_model from './db/db_model';
import morgan from 'morgan';
// test for DDB
import { ddbClient } from '../../libs/ddbClient';
import { DynamoDBDocumentClient, PutCommand, QueryCommand, UpdateCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb';


import { ServerError } from '../types';
import apiRouter from './routes/apiRouter';

// const test = {
//   getUser: async () => {
//     // const string1 = 'SELECT * FROM users';
//     const string2 = 'SELECT url, caption, user_id, date, likes FROM posts JOIN users ON\
//     users._id = posts.user_id';
//     const response = await db_model.query(string2);
//     const { rows } = response;
//     console.log('Response from pool: ', rows);
//   }
// };

const params = {
  TableName: "user_posts",
  KeyConditionExpression: 'user_id = :user_id',
  ExpressionAttributeValues: {
    ":user_id": 1,
  }
} 

const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);

async function query_ddb_item () {
  try {
    const data = await ddbDocClient.send(new QueryCommand(params));
    console.log('Success: ', data.Items);
  } catch(err) {
    console.log('Error: ', err);
  }
}

async function testPutCommand() {
  const params = {
    TableName: 'user_posts',
    Item: {
      user_id: 1,
      timestamp: '1663976134000',
      likes: 2,
      url: 'Yabba!',
      caption: 'test Put number 5',
    },
    ReturnValues: 'ALL_OLD',

  }

  try {
    const response = await ddbDocClient.send(new PutCommand(params));
    console.log('Success Query response: ',response);
  } catch(err) {
    console.log('ERROR: ', err);
  }
}

async function testUpdateCommand() {
  const newCaption = 'REVISED: Updated! 3rd Attempt'

  const params = {
    TableName: 'user_posts',
    Key: {
      user_id: 1,
      timestamp: '1663976133900',
    },
    UpdateExpression: 'SET caption = :caption',
    ExpressionAttributeValues: {
      ':caption': newCaption,
    },
    ReturnValues: 'ALL_NEW',
  };

  try {
    const response = await ddbDocClient.send(new UpdateCommand(params));
    console.log('Successful Query: ', response);
  } catch(err) {
    console.log('ERROR: ', err);
  }
};

async function testDeleteCommand() {
  const params = {
    TableName: 'user_posts',
    Key: {
      user_id: 1,
      timestamp: '1663976133900',
    },
    ReturnValues: 'ALL_OLD',
  }

  try {
    const response = await ddbDocClient.send(new DeleteCommand(params));
    console.log(response);
  } catch(err) {
    console.log('ERROR: ', err);
  }

};


const app = express();

app.use(express.json());

app.use(morgan('tiny'));

// condition: NODE_ENV is production, serve static files
if(process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, '../../dist')));
}

// Is this redundant? Webpack dev server proxy pointed to root is redundant?
// app.get('/', (req, res) => res.status(200).sendFile(path.join(__dirname, '../client/index.html')));

// serve routes
app.use('/api', apiRouter);

// test
// test.getUser();
// query_ddb_item();
// testPutCommand();
// testUpdateCommand();
// testDeleteCommand();

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