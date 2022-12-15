import { defer } from 'react-router-dom';
// imported solely to provide type annotation for queryClient param at loader
import { QueryClient } from '@tanstack/query-core';

const getPublicPostsData = async () => {
  // need a try / catch block for error handling? 
  console.log('inside of getPublicPostsData');
  const response = await fetch('/api/posts/1');
  const data = await response.json();
  return data;
};

export const publicPostsQuery = () => ({
  queryKey: ['publicPostsData'],
  queryFn: async () => getPublicPostsData(),
});

const publicPostsLoader = (queryClient: QueryClient) => 
  async () => {
    console.log('inside publicPostsLoader');
    const query = publicPostsQuery();

    const cachedData = queryClient.getQueryData(query.queryKey);
    console.log('publicPostsLoader: cachedData: ', cachedData);

    return(
      cachedData ? { publicPostsData: cachedData} 
        : defer({ publicPostsData: queryClient.fetchQuery(query)})
    );
  };

export default publicPostsLoader;
