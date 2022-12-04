import React, { Suspense } from 'react';
import { useLoaderData, Await } from 'react-router-dom';
import Explore from './Explore';
import Loader from './Loader';
// import Error? or use parent level errorElement?

import { ExploreChaanListDataProps } from '../../types';

const ExploreChaanWrapper = () => {

  const { exploreChaanListData } = useLoaderData() as Record<string, Promise<ExploreChaanListDataProps> | ExploreChaanListDataProps>;

  console.log('inside HomeWrapper: data from useLoaderData / publicPostsLoader', exploreChaanListData);
  console.log('HomeWrapper component rendered');

  return(
    <Suspense fallback={<Loader />} >
      <Await 
        resolve={exploreChaanListData}
        children={(exploreChaanListData) => (<Explore exploreChaanListData={exploreChaanListData} />)}
      />
    </Suspense>
  )
};

export default ExploreChaanWrapper;