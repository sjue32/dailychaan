import React from 'react';
import { PublicChaanProp, LoggedInUserProp } from '../../types';
import ImageFrameComponent from './ImageFrameComponent';


const Home =  (props: { data: PublicChaanProp[], loggedInUser: LoggedInUserProp ,isLoading: boolean,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>> })  => {
  const { data, loggedInUser, setIsLoading } = props;

  const loggedInUserPosts = loggedInUser.posts;

  console.log('Home component rendered');
  return(
    <div className="homeComponent">
      <h1>Home Page - Daily Chaan</h1>
        <div>
        {
          !loggedInUser.loggedIn ? data.map((data: PublicChaanProp, idx: number) => {
            const { user_id, timestamp, url, caption, likes } = data
          return(<ImageFrameComponent key={`key${idx}`} user_id={user_id} url={url} 
          caption={caption} likes={likes} timestamp={timestamp} home={true}
          setIsLoading={setIsLoading} />);
          }) :
          loggedInUserPosts.map((data: PublicChaanProp, idx: number) => {
            const { user_id, timestamp, url, caption, likes } = data
          return(<ImageFrameComponent key={`key${idx}`} user_id={user_id} url={url} 
          caption={caption} likes={likes} timestamp={timestamp} home={true}
          setIsLoading={setIsLoading} />);
          })
        }
        </div> 
    </div>
  )
};

export default Home;