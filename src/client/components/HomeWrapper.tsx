import React, { Suspense } from 'react';
import { useLoaderData, Await } from 'react-router-dom';
import Home from './Home';
import Loader from './Loader';
// import Error? or use parent level errorElement?

import type { UserPostsProps } from '../../types';

const HomeWrapper = () => {

  const { publicPostsData } = useLoaderData() as Record<string, Promise<UserPostsProps[]> | UserPostsProps[]>;

  console.log('inside HomeWrapper: data from useLoaderData / publicPostsLoader', publicPostsData);
  console.log('HomeWrapper component rendered');

  return(
    <Suspense fallback={<Loader />} >
      <Await 
        resolve={publicPostsData}
        // eslint-disable-next-line
        children={(publicPostsData) => (<Home publicPostsData={publicPostsData} />)}
      />
    </Suspense>
  );
};

export default HomeWrapper;