
import postsController from '../server/controllers/postsController';
import { Request, Response, NextFunction } from 'express';
import db from '../server/db/db_model';

import '@jest/globals';
import sampleGetPostData, { sampleAddUserPostData } from '../sample/sampleGetPostData';

describe('getPosts returns posts data', () => {

  const queryMock = jest.spyOn(db, 'query');

  let mockReq: Partial<Request> = {};
  let mockRes: Partial<Response> = {};
  let mockNext: Partial<NextFunction> = function() { return mockRes as any;};

  beforeAll( async () => {
    queryMock.mockResolvedValue(sampleGetPostData);
    await postsController.getPosts(mockReq as Request, mockRes as Response, mockNext as NextFunction);
  });

  afterAll( async () => {
    queryMock.mockReset();
  });

  // make some test with wrong argument that rejects
  // reject with an error????

  it('returns reponse data from query', async () => {
    const { rows } = await queryMock.mock.results[0].value;
    expect(rows).toBeInstanceOf(Array);
  });

  it('calls db.query function', () => {
    expect(queryMock).toHaveBeenCalledTimes(1);
  });

  it('was given string argument', () => {
    const string = 'SELECT url, caption, user_id, date, likes FROM users JOIN users ON users._id = posts.user_id WHERE users._id = 1';
    expect(queryMock.mock.calls[0][0]).toBe(string);

  });

  it('res.locals to contain an array', () => {
    expect(mockRes.locals).toBeInstanceOf(Array);
  });

  it('contains post data related to user_id 1', () => {
    expect(mockRes.locals[0].user_id).toBe(1);
  });

  it('contains links to jpeg images', () => {
    expect(/https/.test(mockRes.locals[0].url)).toBe(true);
    expect(/jpeg/.test(mockRes.locals[0].url)).toBe(true);
  });

});

describe('posts retrived for specific user', () => {

  const queryMock = jest.spyOn(db, 'query');
  // queryMock.mockResolvedValue(sampleGetPostData);

  const test_req_param: string = '1';
  const mockReq: Partial<Request> = { 
    params: {
      user_id: test_req_param,
    }
   };
  const mockRes: Partial<Response> = {};
  const mockNext: Partial<NextFunction> = function() { return mockRes as any;};

  beforeAll( async () => {
    // const queryMock = jest.spyOn(db, 'query');
    queryMock.mockResolvedValue(sampleGetPostData);
    await postsController.getUserPosts(mockReq as Request, mockRes as Response, mockNext as NextFunction);
  });

  afterAll( async () => {
    queryMock.mockReset();
  });

  it('called mockQuery with 2 arguments', () => {
    expect(queryMock.mock.calls[0].length).toBe(2);
  });

  it('passed in user_id as 2nd argument', () => {
    expect(queryMock.mock.calls[0][1]).toBe(Number(test_req_param));
  });

  it('returns expected response data from queryMock', async () => {
    expect(await queryMock.mock.results[0].value).toBeInstanceOf(Object);
  })

  it('stores an array at mockRes.locals', () => {
    expect(mockRes.locals).toBeInstanceOf(Array);
  });

  it('contains post data related to user_id from req.params', () => {
    const data = mockRes.locals;
    expect(data[0].user_id).toBe(Number(test_req_param));
  });

  it('contains links to jpeg images', () => {
    const url = mockRes.locals[0].url;
    expect(/https/.test(url)).toBe(true);
    expect(/jpeg/.test(url)).toBe(true);
  });


});

describe('add post for specific user', () => {

  const queryMock = jest.spyOn(db, 'query');
  const sampleData = sampleAddUserPostData.rows[0];
  // add object to mockReq related to user's new post
  const user_data = {
    user_id: sampleData.user_id,
    url: sampleData.url,
    caption: sampleData.caption
  }
  const id: number = 2;
  //  when making a addPost, should we still use req.params, or store user_id in the body or both?
  // all requests seem to be related to a specific user at this time, so it makes sense to keep params
  // to organize the path of our requests
  const mockReq: Partial<Request> = {
    params: {
      user_id: `${id}`,
    },
    body: user_data,

  };
  const mockRes: Partial<Response> = {
  };
  // const mockNext: Partial<NextFunction> = function(arg?: Error) { return arg;};
  const mockNext: Partial<NextFunction> = function() { return;};


  beforeAll(async () => {
    const successfulResponse = sampleAddUserPostData;
    queryMock.mockResolvedValue(successfulResponse);
    const answer = await postsController.addUserPost(mockReq as Request, mockRes as Response, mockNext as NextFunction);
    // await console.log('Response from calling postsController.addUserPost', answer);

  });

  afterAll(async () => {
    queryMock.mockReset();
  });

  // assertions
  it('mockRes has correct id', () => {
    expect(mockReq.params.user_id).toBe('2');
  });
  // calls db.query function
  it('calls db.query function', () => {
    expect(queryMock.mock.calls[0].length).toBe(2);
  });
  // was given string arg
  it('passed in POST sql string as 1st argument', () => {
    expect(/INSERT INTO posts/.test(queryMock.mock.calls[0][0])).toBe(true);
  });
  // db.query response contains data / object
  it('returns an object containing a rows property', async ()=> {
    const { rows } = await queryMock.mock.results[0].value;
    expect(rows).toBeDefined();
  });
  // db.query response contains data of added post (url link)
  it('returns query response with data - img url, user_id', async () => {
    // const response = queryMock.mock.results[0].value;
    const { rows } = await queryMock.mock.results[0].value;
    const data = rows[0];
    expect(/jpeg/.test(data.url)).toBe(true);
    expect(data.user_id).toBe(user_data.user_id);
    // expect(rows[0].caption).toBeInstanceOf(String || null);
  });

});

// save for describe block for error response from DB
describe('add user post with error triggers error handler', () => {
  const queryMock = jest.spyOn(db, 'query');

  const sampleData = sampleAddUserPostData.rows[0];
  const user_data = {
    user_id: sampleData.user_id,
    url: sampleData.url,
    caption: sampleData.caption
  }
  const id: number = 2;
  const mockReq: Partial<Request> = {
    params: {
      user_id: `${id}`,
    },
    body: user_data,
  };
  let mockRes: Partial<Response> = {};
  let mockNext: Partial<NextFunction> = function() { };

  // beforeAll(async () => {
  //   queryMock.mockRejectedValue(new Error('Error occured in postsController.addUserPost'));
  //   // await postsController.addUserPost(mockReq as Request, mockRes as Response, mockNext as NextFunction);
  // })


  it('throws an error when db.query returns an error', async () => {
    try {
      queryMock.mockRejectedValue(new Error('Error occured in postsController.addUserPost'));
      await postsController.addUserPost(mockReq as Request, mockRes as Response, mockNext as NextFunction);

    } catch(err) {
      expect(err.message).toBe('Error occured in postsController.addUserPost');
    }
  }); 

  // this requires the reject met
  // it('throws an error', async () => {
  //   expect(queryMock.toThrow('Error occured in postsController.addUserPost');
  // });

  afterAll(() => {
    queryMock.mockReset();
  })

  it('was called 1 time', async () => {
    expect(queryMock).toBeCalledTimes(1);
  });

});

describe('Update post successful', () => {

});

describe('Delete post successful', () => {

});


