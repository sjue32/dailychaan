import { defer } from 'react-router-dom';
// imported solely to provide type annotation for queryClient param at loader
import { QueryClient } from '@tanstack/query-core';

const getUserPostsData = async (user_id: string) => {

  try {
    console.log('inside of getUserPostsData: user_id: ', user_id);
    console.log('getUserPostsData: typeof user_id: ', typeof user_id)
    const response = await fetch(`/api/posts/${user_id}`);
    const data = await response.json();
    return data;
    
  } catch(error) {
    console.log('ERROR inside getUserPostsData in userPostsLoader: ', error);
  }
}

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

// fix the type annotation later - issue with QueryClient 
const userPostsLoader = (queryClient: QueryClient) => 
  async (props: { params: Record<string, string>} ) => {

    const { params } = props;
    console.log('inside userPostsLoader, params: ', params, ' , user_id: ', params.user_id, ' ,type: ', typeof params.user_id);

    console.log('inside userPostsLoader');

    const query = userPostsQuery(params.user_id);

    const cachedData = queryClient.getQueryData(query.queryKey);
    console.log('userPostsLoader: cachedData: ', cachedData);

    return(
      cachedData ? { userPostsData: cachedData } 
      : defer({ userPostsData: queryClient.fetchQuery(query)})
    );

  }

  export default userPostsLoader;