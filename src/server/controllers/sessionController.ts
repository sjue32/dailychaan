import { Request, Response, NextFunction } from 'express';

const sessionController = {
  checkAuthStatus: async (req: Request) => {
    console.log('inside checkAuthStatus');

    const authStatus = await req.session.isAuthenticated;
    const { username } = req.params;
    const sessionUserId = await req.session.username;
    const compareUserId = sessionUserId == username;
    console.log('inside checkAuthStatus: after comparison of session and compareUseId: req.session: ', req.session);
    console.log('inside checkAuthStatus: status: ', authStatus);
    return authStatus && compareUserId ? true : false;
  },

  isLoggedIn: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const checkAuthStatus = sessionController.checkAuthStatus;
      // check that user is authorized
      const check = await checkAuthStatus(req);
      console.log('sessionID: ', req.sessionID);
      console.log('isLoggedIn: req.session: ', req.session);
      console.log('checkAuthStatus: ', check);
      if(check) {
        req.session.views ? req.session.views += 1 : req.session.views = 1;
        res.locals.message = 'user is authorized';
        console.log('current session Object: ', req.session);
      }
      // if not authorized, log user out
      else {
        console.log('inside isLoggedIn, user not auth: req.session: ', req.session);
        res.locals.message = 'user not authorized';
        return res.status(401).json({ message: res.locals.message });
      }

      return next();
    } catch(err) {
      const errObj = {
        log: `sessionController.isLoggedIn: ERROR : ${err}`,
        status: 404,
        message: { err: 'sessionController.isLoggedIn: ERROR: Check server logs for details'}
      };
      return next(errObj);
    }
  },
  
  startSession: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username } = req.params;
      // start session, add username and authentication status
      req.session.isAuthenticated = true;
      req.session.username = username;
      console.log('session: ', req.session);
      console.log('inside startSession, auth status: ', req.session.isAuthenticated);
      return next();
    } catch(err) {
      const errObj = {
        log: `sessionController.startSession: ERROR : ${err}`,
        status: 404,
        message: { err: 'sessionController.startSession: ERROR: Check server logs for details'}
      };
      return next(errObj);
    }
  },

  endSession: async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log('inside endSession');
      // checkAuthStatus
      const loginStatus = await sessionController.checkAuthStatus(req);
      console.log('inside endSession: loginStatus: ', loginStatus);
      if(loginStatus) {
        await req.session.destroy(() => console.log('endSession - session ended'));
        console.log('inside sessionController.endSession: req.session', req.session);
        res.locals.message = 'user is logged out';
        console.log('endSession - user is logged out');
      }
      else {
        console.log('end Session: user is already logged out, session already expired');
        res.locals.message = 'user is already logged out';
      }
      return next();

    } catch(err) {
      const errObj = {
        log: `sessionController.endSession: ERROR : ${err}`,
        status: 404,
        message: { err: 'sessionController.endSession: ERROR: Check server logs for details'}
      };
      return next(errObj);
    }
  },

};

export default sessionController;