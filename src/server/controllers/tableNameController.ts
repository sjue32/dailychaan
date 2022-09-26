import { Request, Response, NextFunction } from 'express';


const tableNameController = {
  // assign table name to access user_posts table in DDB
  assignPosts: (req: Request, res: Response, next: NextFunction) => {
    if(req.body.test == true) {
      req.body.table_name = 'test_user_posts';
    } else {
      req.body.table_name = 'user_posts';
    }
    return next();
  },
  // assign table name to access test_user_posts table in DDB
  assignTestPosts: (req: Request, res: Response, next: NextFunction) => {
    req.body.table_name = 'test_users_posts';
    return next();
  },
}
export default tableNameController;