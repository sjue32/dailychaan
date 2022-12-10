import React, { Suspense } from 'react';
import { useLoaderData, Await } from 'react-router-dom';
import Explore from './Explore';
import Loader from './Loader';
// import Error? or use parent level errorElement?

import type { ExploreChaanListDataProps } from '../../types';

const ExploreChaanWrapper = () => {

  const { userListData } = useLoaderData() as Record<string, Promise<ExploreChaanListDataProps> | ExploreChaanListDataProps>;

  console.log('inside ExploreChaanWrapper: data from useLoaderData / exploreChaanLoader', userListData);
  console.log('ExploreChaanWrapper component rendered');

  return(
    <Suspense fallback={<Loader />} >
      <Await 
        resolve={userListData}
        children={(userChaanListData) => (<Explore userListData={userChaanListData} />)}
      />
    </Suspense>
  )
};

export default ExploreChaanWrapper;