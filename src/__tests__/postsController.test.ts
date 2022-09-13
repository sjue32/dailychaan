
import postsController from '../server/controllers/postsController';
import { Request, Response, NextFunction } from 'express';
import db from '../server/db/db_model';

import '@jest/globals';
import sampleGetPostData from '../sample/sampleGetPostData';

describe('getPosts returns posts data', () => {
  // mock the db module
  // assign a mock function to db.query
  const queryMock = jest.spyOn(db, 'query');
  queryMock.mockResolvedValue(sampleGetPostData);

  // make some test with wrong argument that rejects
  // reject with an error????

  // other assertions, for mockRes.locals
  // the url property contains a string with a '.jpg' regex

  it('query returns reponse data', async () => {

    let mockReq: Partial<Request> = {};
    let mockRes: Partial<Response> = {};
    let mockNext: Partial<NextFunction> = function() { return mockRes as any;};

    await postsController.getPosts(mockReq as Request, mockRes as Response, mockNext as NextFunction);
    const { rows } = await queryMock.mock.results[0].value;
    queryMock.mock.calls.pop();
    expect(rows).toBeInstanceOf(Array);

  });

  const queryMock2 = jest.spyOn(db, 'query');
  queryMock2.mockResolvedValue(sampleGetPostData);

  // invoking postsController.getPosts without await
  let mockReq: Partial<Request> = {};
  let mockRes: Partial<Response> = {};
  let mockNext: Partial<NextFunction> = function() { return mockRes as any;};

  postsController.getPosts(mockReq as Request, mockRes as Response, mockNext as NextFunction);

  it('calls db.query function', () => {
    // console.log('queryMock2 calls: ', queryMock2.mock.calls);
    expect(queryMock2).toHaveBeenCalledTimes(1);
  });
  it('was given string argument', () => {
    const string = 'SELECT url, caption, user_id, date, likes FROM users JOIN users ON users._id = posts.user_id WHERE users._id = $1';
    const param = [1];
    expect(queryMock2.mock.calls[0][0]).toBe(string);
    expect(queryMock2.mock.calls[0][1]).toStrictEqual(param);

  });

  it('res.locals to contain an array', () => {
    expect(mockRes.locals).toBeInstanceOf(Array);
  });
  it('to contain objects', () => {
    expect(mockRes.locals[0]).toBeInstanceOf(Object);
  });
  it('contains post data related to user_id 1', () => {
    expect(mockRes.locals[0].user_id).toBe(1);
  });

});

describe('New post successfully created', () => {

});

describe('Update post successful', () => {

});

describe('Delete post successful', () => {

});


