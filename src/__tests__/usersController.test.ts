import usersController from '../server/controllers/usersController';
import { Request, Response, NextFunction } from 'express';
import { ddbDocClient } from '../../libs/ddbDocClient';
// import { PutCommand, GetCommand } from '@aws-sdk/lib-dynamodb';
import { validCredentials, validCredentialsPasswordData, invalidUsernameData, invalidUsernameCredentials,
  invalidCredentials, invalidCredentialsPasswordData, usernameExistsData, usernameExistsCredentials,
  usernameDoesNotExist, successfulCreateUserCredentials } from '../sample/samplePasswords';

import sampleGetUsersData from '../sample/sampleGetUsersData';

describe('getUsers will retrieve an object containing some basic data on all users', () => {
  
  const queryMock = jest.spyOn(ddbDocClient, 'send');
  // set up mock req, res, next objects for express
  const mockReq: Partial<Request> = {
    body: {
      table_name: 'users',
    }
  };
  const mockRes: Partial<Response> = {};
  const mockNext: Partial<NextFunction> = function() {return;};

  // beforeAll - set up mockResolvedValue, await usersController.getUsers invokation
  beforeAll( async () => {
    queryMock.mockResolvedValue(sampleGetUsersData as never);
    await usersController.getUsers(mockReq as Request, mockRes as Response, mockNext as NextFunction);
  });
  afterAll(() => {
    queryMock.mockReset();
  });

  // returns object, user_list is instance of an object
  it('retrieves object with user_info and user_list property', async () => {
    const { Item } = await queryMock.mock.results[0].value;

    const { user_list } = Item;
    // console.log('inside usersController.test: user_list: ', user_list);
    expect(user_list).toBeInstanceOf(Object);
  });
  // all objects contain username and user_id properties
  it('should contain a username and user_id in each user object', async () => {

    const data = mockRes.locals;
    // console.log('usersController.test mockRes.locals: ', data);
    const userListArray = Object.values(data);
  
    userListArray.forEach((user) => {
      expect(user.username).toBeDefined();
      expect(user.user_id).toBeDefined();
    });
  });
});

// verifyUser
describe('check verifyUser during successful login', () => {

  const queryMock = jest.spyOn(ddbDocClient, 'send');

  const { usernameInput, passwordInput } = validCredentials;
  const storedCredentials = validCredentialsPasswordData.Item;
  const { username, user_id, fav_users } = storedCredentials;


  // set up mock req, res, next objects for express
  const mockReq: Partial<Request> = {
    body: {
      username: usernameInput,
      password: passwordInput,
    },
  };
  const mockRes: Partial<Response> = {};
  const mockNext: Partial<NextFunction> = function() {return;};

  beforeAll( async () => {
    queryMock.mockReturnValueOnce(validCredentialsPasswordData as never);
    await usersController.verifyUser(mockReq as Request, mockRes as Response, mockNext as NextFunction);
  });

  afterAll( async () => {
    queryMock.mockReset();
  });

  // check that call to DDB retrieves username/pw combination
  it('retrieves correct username DDB', () => {
    const { Item } = queryMock.mock.results[0].value;
    // console.log('inside verifyUser: Item: ', Item);
    const { username } = Item;
    expect(username).toEqual(usernameInput);
  });
  // else res.locals.message 'user verified'
  it('stores string "user verified" at res.locals.message', () => {
    expect(mockRes.locals.message).toEqual('user verified');
    // console.log('mockRes.locals', mockRes.locals);
  });
  it('assigns an object containing user_id, username,fav_users, liked to property user_data', async () => {
    const mockUserData = { username, user_id, fav_users };
    // console.log('check mockUserData', mockUserData);
    expect(mockRes.locals.user_data).toEqual(mockUserData);
  });
});

describe('check verifyUser when username does not exist in DBB', () => {
  // if username record doesn't exist at DDB (data is undefined), return message: 'username does not exist'
  const queryMock = jest.spyOn(ddbDocClient, 'send');

  const { usernameInput, passwordInput } = invalidUsernameCredentials;

  const mockReq: Partial<Request> = {
    body: {
      username: usernameInput,
      password: passwordInput,
    }
  };
  const mockRes: Partial<Response> = {};
  const mockNext: Partial<NextFunction> = function () {return;};

  beforeAll( async () => {
    queryMock.mockResolvedValueOnce(invalidUsernameData as never);
    await usersController.verifyUser(mockReq as Request, mockRes as Response, mockNext as NextFunction);
  });

  afterAll( async () => {
    queryMock.mockReset();
  });

  it('returns property message and value "username does not exist"', () => {
    // console.log('verifyUser: mockRes.locals: ', mockRes.locals);
    const { message } = mockRes.locals;
    // console.log('verifyUser: returned data is undefined', message);
    expect(message).toEqual('username does not exist');
  });
});

describe('check verifyUser when username and password do not match', () => {
  // if stored hashed pw doesn't match newly hashed pw, return res.locals.message 'username / password does not match'
  const queryMock = jest.spyOn(ddbDocClient, 'send');

  const { usernameInput, passwordInput } = invalidCredentials;

  const mockReq: Partial<Request> = {
    body: {
      username: usernameInput,
      password: passwordInput,
    }
  };
  const mockRes: Partial<Response> = {};
  const mockNext: Partial<NextFunction> = function () {return;};

  beforeAll( async () => {
    queryMock.mockResolvedValueOnce(invalidCredentialsPasswordData as never);
    await usersController.verifyUser(mockReq as Request, mockRes as Response, mockNext as NextFunction);
  });

  afterAll( async () => {
    queryMock.mockReset();
  });

  // mockRes.locals.message is 'username / password does not match'
  it('stores string "username / password does not match" at mockRes.locals.message', () => {
    // console.log('verifyUser: checking invalid creds: ', mockRes.locals.message);
    expect(mockRes.locals.message).toEqual('username / password does not match');
  });

});

// createUser
describe('Attempt to create username when it already exists', () => {
  const queryMock = jest.spyOn(ddbDocClient, 'send');
  // user supplies mocker username, pw, email - taken from sample data
  const { usernameInput, passwordInput, emailInput } = usernameExistsCredentials;

  const mockReq: Partial<Request> = {
    body: {
      username: usernameInput,
      password: passwordInput,
      email: emailInput,
    },
  };
  const mockRes: Partial<Response> = {};
  const mockNext: Partial<NextFunction> = function () { return;};
  // mock the response
  beforeAll( async () => {
    queryMock.mockResolvedValueOnce(usernameExistsData as never);
    await usersController.createUser(mockReq as Request, mockRes as Response, mockNext as NextFunction);
  });

  afterAll(() => {
    queryMock.mockReset();
  });

  // if Item property is assigned data, assign string 'user already exists' to res.locals.message
  it('assigns string "user already exists" to res.locals.message if username is already taken ', () => {
    console.log('createUser: user already exists: mockRes.locals.message: ', mockRes.locals.message);
    expect(mockRes.locals.message).toEqual('user already exists');
  });

});

describe.skip('Successful attempt to create username', () => {
  
  const queryMock = jest.spyOn(ddbDocClient, 'send');

  const { usernameInput, passwordInput, emailInput } = successfulCreateUserCredentials;

  const mockReq: Partial<Request> = {
    body: {
      username: usernameInput,
      password: passwordInput,
      email: emailInput,
    },
  };
  const mockRes: Partial<Response> = {};
  const mockNext: Partial<NextFunction> = function () { return;};

  beforeAll(() => {
    // mock return values, 1st call - , 2nd call - 
    queryMock.mockReturnValueOnce(usernameDoesNotExist as never)
      .mockReturnValue();
  });

  // createUser func incomplete

});




