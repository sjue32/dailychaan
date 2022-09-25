import { Request, Response, NextFunction } from 'express';


const tableNameController = {
  // assign table name to access user_posts table in DDB
  assignPosts: (req: Request, res: Response, next: NextFunction) => {
    req.body.table_name = 'users_posts';
    return next();
  },
  // assign table name to access test_user_posts table in DDB
  assignTestPosts: (req: Request, res: Response, next: NextFunction) => {
    req.body.table_name = 'test_users_posts';
    return next();
  },
}
export default tableNameController;