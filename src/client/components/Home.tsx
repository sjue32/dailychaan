import React from 'react';
import { PublicChaanProp, LoggedInUserProp } from '../../types';
import ImagePost from './ImagePost';
import useFetch from '../custom_hooks/useFetch';
import { ThreeDots } from 'react-loader-spinner';

const Home =  ()  => {
  const publicPostsUrl = '/api/posts/1';
  const { isLoading, isError, data } = useFetch(publicPostsUrl);

  console.log('isLoading', isLoading);

  setTimeout(() => {
    if(isLoading) {
      console.log('inside of setTimeout of Home Component');
      // return <div className="testSpinner">LOADING SPINNER ...</div>;
      return <div>LOADING SPINNER ...</div>;
    }
  }, 0);

  console.log('Home component rendered');
  return(
    <div className="homeComponent">
      <h1>Home Page - Daily Chaan</h1>
      <div className="homeComponentInnerContainer">
        {
          isError ? <div className ='errorNetwork'> ERROR: NETWORK TROUBLE - add an error with network component here</div>
          : data.map((object: PublicChaanProp, idx: number) => {
            const { username, user_id, timestamp, url, caption, likes } = object;
            return(<ImagePost id={`img${idx}`} key={`key${idx}`} username={username} user_id={user_id} url={url}
            caption={caption} likes={likes} timestamp={timestamp} />)
          })
        }
      </div>
    </div>
  )
};

export default Home;