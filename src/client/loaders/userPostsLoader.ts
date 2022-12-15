import { defer, LoaderFunction } from 'react-router-dom';
// imported solely to provide type annotation for queryClient param at loader
import { QueryClient } from '@tanstack/query-core';

const getUserPostsData = async (user_id: string) => {

  try {
    console.log('inside of getUserPostsData: user_id: ', user_id);
    console.log('getUserPostsData: typeof user_id: ', typeof user_id);
    const response = await fetch(`/api/posts/${user_id}`);
    const data = await response.json();
    return data;
    
  } catch(error) {
    console.log('ERROR inside getUserPostsData in userPostsLoader: ', error);
  }
};

export const userPostsQuery = (user_id: string) => ({
  queryKey: ['userPostsData', user_id],
  queryFn: async () => getUserPostsData(user_id)
});

// tried narrowing params object type to an object with user_id key, however this error 
// popped up: 
// Type '(props: { params: testParamProp; }) => Promise<DeferredData | { userPostsData: unknown; }>' is not assignable to type 'LoaderFunction'.
//   Types of parameters 'props' and 'args' are incompatible.
//   Type 'LoaderFunctionArgs' is not assignable to type '{ params: testParamProp; }'.
//     Types of property 'params' are incompatible.
//       Property 'user_id' is missing in type 'Params<string>' but required in type 'testParamProp'.ts(2322)
// type testParamProp = {
//   user_id: string
// }

// type userIdParams = {
//   user_id: string
// }

// fix the type annotation later - issue with QueryClient 
// const userPostsLoader = ({params}) => 

const userPostsLoader = (queryClient: QueryClient): LoaderFunction => 
  // async (props: { params: userIdParams } ) => {
  // originally the code below threw TS errors, so at some point I switched to something similar to
  // the code above, but now it causes issues with the LoaderFunction and LoaderFunctionArgs as per
  // the error that was thrown on index.tsx, so now I keep params typed as any. 
  async ({params}) => {


    const { user_id } = params;
    console.log('inside userPostsLoader, params: ', params, ' , user_id: ', user_id, ' ,type: ', typeof user_id);

    console.log('inside userPostsLoader');

    const query = userPostsQuery(user_id as string);

    const cachedData = queryClient.getQueryData(query.queryKey);
    console.log('userPostsLoader: cachedData: ', cachedData);

    return(
      cachedData ? { userPostsData: cachedData } 
        : defer({ userPostsData: queryClient.fetchQuery(query)})
    );

  };

export default userPostsLoader;