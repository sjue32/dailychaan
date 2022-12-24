import 'express-session';

// creates file as a module
export {};

declare module 'express-session' {
  interface SessionData {
    isAuthenticated: boolean,
    username: string,
    views: number,
  }
}