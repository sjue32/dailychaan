import sessionController from '../server/controllers/sessionController';
import { Request, Response, NextFunction } from 'express';

import { startSessionUsername, loggedInUsername } from '../sample/sampleSessionData';

describe('check startSession', () => {

  const username = startSessionUsername;

  const mockReq: Partial<Request> = {
    params: {
      username,
    },
    body: {},
    session: {
      id: undefined,
      cookie: undefined,
      regenerate: undefined,
      destroy: undefined,
      reload: undefined,
      resetMaxAge: undefined,
      touch: undefined,
      save: undefined,
      isAuthenticated: false,
      views: 0,
      username: '',
    },
  };
  const mockRes: Partial<Response> = {};
  const mockNext: Partial<NextFunction> = function() { return;};
  // beforeAll - invoke sessionController.startSession
  beforeAll( async () => {
    await sessionController.startSession(mockReq as Request, mockRes as Response, mockNext as NextFunction);
  });
  // check that req.session.authenticated is true, and req.session.username is assigned username
  it('has a session object, and key isAuthenticated is true', () => {
    // console.log('inside sessionController.test: session object: ', mockReq.session);
    expect(mockReq.session.isAuthenticated).toBe(true);
  });

  it('has username stored at session object', () => {
    expect(mockReq.session.username).toEqual(username);
  });
});

describe('checking endSession method for logged in user', () => {
  
  const username = loggedInUsername;

  const mockReq: Partial<Request> = {
    params: {
      username,
    },
    body: {},
    session: {
      id: undefined,
      cookie: undefined,
      regenerate: undefined,
      destroy: function() { return undefined;},
      reload: undefined,
      resetMaxAge: undefined,
      touch: undefined,
      save: undefined,
      isAuthenticated: true,
      views: 0,
      username,
    },
  };
  const mockRes: Partial<Response> = {
    locals: {},
  };
  const mockNext: Partial<NextFunction> = function() { return;};

  const sessionDestroyMock = jest.spyOn(mockReq.session, 'destroy');

  beforeAll( async () => {
    // mock destroy method, set session object to undefined
    sessionDestroyMock.mockImplementation(() => {
      // console.log('inside of sessionDestroyMock');
      mockReq.session.isAuthenticated = undefined;
      mockReq.session.username = undefined;
      return undefined;
    });
    await sessionController.endSession(mockReq as Request, mockRes as Response, mockNext as NextFunction);
  });

  afterAll( async () => {
    await sessionDestroyMock.mockReset();
  });

  it('will destroy req.session object', () => {
    // console.log('sessionController.endSession test file: mockReq.session: ', mockReq.session);
    expect(mockReq.session.isAuthenticated).toBeUndefined();
    expect(mockReq.session.username).toBeUndefined();
  });

  it('assigns string "user is logged out" to res.locals.message', () => {
    expect(mockRes.locals.message).toEqual('user is logged out');
  });

});

describe('invoking endSession method when session object is already destroyed', () => {
  
  const username = loggedInUsername;

  const mockReq: Partial<Request> = {
    params: {
      username,
    },
    body: {},
    session: {
      id: undefined,
      cookie: undefined,
      regenerate: undefined,
      destroy: function() { return undefined;},
      reload: undefined,
      resetMaxAge: undefined,
      touch: undefined,
      save: undefined,
    },

  };
  const mockRes: Partial<Response> = {
    locals: {},
  };
  const mockNext: Partial<NextFunction> = function() { return;};

  beforeAll( async () => {
    await sessionController.endSession(mockReq as Request, mockRes as Response, mockNext as NextFunction);
  });


  it('string "user is already logged out" is assigned to res.locals.message ', () => {
    console.log('inside endSession: session already destroyed: mockReq.session: ', mockReq.session);
    expect(mockRes.locals.message).toEqual('user is already logged out');
  });

});

// isLoggedIn
describe('checking isLoggedIn method when user still has active cookie', () => {
  // sample username
  const username = loggedInUsername;
  // mockReq, res, next
  // req.session has defined isAuthenticated, sample username, views?
  const mockReq: Partial<Request> = {
    params: {
      username,
    },
    body: {},
    session: {
      id: undefined,
      cookie: undefined,
      regenerate: undefined,
      destroy: function() { return undefined;},
      reload: undefined,
      resetMaxAge: undefined,
      touch: undefined,
      save: undefined,
      isAuthenticated: true,
      username,
    },

  };
  const mockRes: Partial<Response> = {
    locals: {},
  };
  const mockNext: Partial<NextFunction> = function() { return;};

  // invoked isLoggedIn
  beforeAll( async () => {
    await sessionController.isLoggedIn(mockReq as Request, mockRes as Response, mockNext as NextFunction);
  });
  // expect string 'user is authorized'
  it('assigns string "user is authorized" to res.locals.message', () => {
    expect(mockRes.locals.message).toEqual('user is authorized');
  });
  // expect req.session.views is 1
  it('sets session.views to 1', () => {
    expect(mockReq.session.views).toEqual(1);
  });

  afterAll( async () => {
    // invoke isLogged in a 2nd time
    await sessionController.isLoggedIn(mockReq as Request, mockRes as Response, mockNext as NextFunction);
    console.log('inside sessionController.isLoggedIn: afterAll: req.session: ', mockReq.session);
    // expect req.session.views to be 2
    // it('increments sessions.views again during 2nd call to isLoggedIn()', () => {
    //   console.log('inside sessionController.isLoggedIn: afterAll: req.session: ', mockReq.session);
    // allowed to add another expect statement after afterAll() is called, but now allowed to 
    // run another it('') test
    expect(mockReq.session.views).toEqual(2);
    // });
  });

});

describe('checking isLoggedIn method when user still has inactive cookie', () => {

  // sample username
  const username = loggedInUsername;
  // mockReq, res, next
  // req.session has defined isAuthenticated, sample username, views?
  const mockReq: Partial<Request> = {
    params: {
      username,
    },
    body: {},
    session: {
      id: undefined,
      cookie: undefined,
      regenerate: undefined,
      destroy: function() { return undefined;},
      reload: undefined,
      resetMaxAge: undefined,
      touch: undefined,
      save: undefined,
      // isAuthenticated: true,
      // username,
    },

  };
  const mockRes: Partial<Response> = {
    locals: {},
  };
  const mockNext: Partial<NextFunction> = function() { return;};

  // invoked isLoggedIn
  beforeAll( async () => {
    await sessionController.isLoggedIn(mockReq as Request, mockRes as Response, mockNext as NextFunction);
  });

  it('assigns string "user not authorized" to res.locals.message', () => {
    expect(mockRes.locals.message).toEqual('user not authorized');
  });

});
