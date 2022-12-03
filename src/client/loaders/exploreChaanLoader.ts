import { defer } from 'react-router-dom';
// imported solely to provide type annotation for queryClient param at loader
import { QueryClient } from '@tanstack/query-core';

const getExploreChaanListData = async () => {
  // need a try / catch block for error handling? 
  console.log('inside of getExploreChaanListData');
  const response = await fetch('/api/users/');
  const data = await response.json();
  return data;
}

export const exploreChaanQuery = () => ({
  queryKey: ['exploreChaanData'],
  queryFn: async () => getExploreChaanListData(),
});

const exploreChaanLoader = (queryClient: QueryClient) => 
  async () => {
    console.log('inside exploreChaanLoader');
    const query = exploreChaanQuery();

    const cachedData = queryClient.getQueryData(query.queryKey);
    console.log('exploreChaanLoader: cachedData: ', cachedData);

    return(
      cachedData ? { exploreChaanListData: cachedData} 
      : defer({ exploreChaanListData: queryClient.fetchQuery(query)})
    )
  };

  export default exploreChaanLoader;