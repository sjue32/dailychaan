import postsRouter from '../server/routes/postsRouter';

// is this an integrated test, or a unit test to check the code?

// if connecting to live DDB, checking getPublicPosts and get userPosts easier
// checking addUserPost would add an extra post
// updateUserPosts would require a specific timestamp - change the caption? or just change it to 
// the same caption?
// deleteUserPost would delete an actual post - unless we add a post and then delete it right away

// if we had a test DB, and we wanted to be to be able to change the table for testing for
// postsController, we would need to specify the tableName at the postsRouter or apiRouter, assign it
// to request.body, and then assign that variable at the functions of postsController
// that way during testing, we can just pass whatever TableName we want, and specify our test table.

// worth considering, so the TableName isn't hardcoded in the postsController

// so we need to create a middleware function who's sole purpose is to assign property table_name to
// req.body

// ex: 
// postsRouter.get('/', postsController.assignTable, postsController.getPublicPosts, (req: Request, res: Response, next: NextFunction) => {
//   return res.status(200).json(res.locals);
// });

// const postsController = {
//   assignTable: (req: Request, res: Response, next: NextFunction) => {
//     try {
//       req.body.table_name = 'user_posts';
//       return next();
//     } catch(err) {
//       console.log(err);
//       // pass new error object to global error handler with next
//       const errObj = {
//         log: `postsController.getPosts : ERROR : ${err}`,
//         status: 404,
//         message: { err: 'postsController.assignTable: ERROR: Check server logs for details'}
//       }
//       return next(errObj);
//     }
//   }
// }