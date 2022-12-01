import { Request, Response, NextFunction } from 'express';


const tableNameController = {
  // assign table name to access user_posts table in DDB
  assignPosts: (req: Request, res: Response, next: NextFunction) => {
    console.log('inside of assignPosts');
    const { user_id } = req.params;
    if(/test/.test(user_id)) {
      req.body.table_name = 'test_user_posts';
      // need to remove 'test' from user_id, and assign only the number to req.params,user_id
      // req.params.user_id = user_id[0];
    } else {
      req.body.table_name = 'user_posts';
    }
    if(/one/.test(user_id)) {
      req.body.getOnePost = true;
    }
    // reassign only digits to req.params.user_id
    let new_user_id = '';
    for(let i = 0; i < user_id.length; i++) {
      if(!(/[0-9]/.test(user_id[i]))) {
        break;
      }
      else {
        new_user_id += user_id[i];
      }
    }
    console.log('tableNameController: user_id: ', user_id, ', new_user_id: ', new_user_id);
    req.params.user_id = new_user_id;
    return next();
  },
  // assign table name to access test_user_posts table in DDB
  assignTestPosts: (req: Request, res: Response, next: NextFunction) => {
    req.body.table_name = 'test_users_posts';
    return next();
  },
  assignUsers: (req: Request, res: Response, next:NextFunction) => {
    console.log('inside of assignUsers');
    const { table } = req.params;
    if(/test/.test(table)) {
      req.body.table_name = 'test_user_data';
      // need to remove 'test' from user_id, and assign only the number to req.params,user_id
      // req.params.user_id = user_id[0];
    } else {
      req.body.table_name = 'users';
    }
    return next();

  },
}
export default tableNameController;