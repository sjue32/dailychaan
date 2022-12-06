import React, { Suspense } from 'react';
import { useLoaderData, Await } from 'react-router-dom';
import Posts from './Posts';
import Loader from './Loader';
// import Error? or use parent level errorElement?

import { UserPostsProps } from '../../types';

const UserPostsWrapper = () => {

  const { userPostsData } = useLoaderData() as Record<string, Promise<UserPostsProps[]> | UserPostsProps[]>;

  console.log('inside UserPostsWrapper: data from useLoaderData / publicPostsLoader', userPostsData);
  console.log('UserPostsWrapper component rendered');

  return(
    <Suspense fallback={<Loader />} >
      <Await 
        resolve={userPostsData}
        children={(userPostsData) => (<Posts userPostsData={userPostsData} />)}
      />
    </Suspense>
  )
};

export default UserPostsWrapper;