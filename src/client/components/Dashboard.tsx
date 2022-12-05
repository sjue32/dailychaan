import React, { useContext } from 'react';
import ImagePost from './ImagePost';
import { ImagePostProps } from '../../types';

import { CurrentUserContext } from './CurrentUserContext';

const Dashboard = () => {

  const { currentUser } = useContext(CurrentUserContext);

  // const { loggedInUser } = props;
  const { loggedIn, username, posts, fav_users } = currentUser;

  return(
    <div className='postsComponent'>
      <h2>{username} Feed</h2>
      <div className="postsComponentInnerContainer">
        { posts.map((imagePostMetadata: ImagePostProps, idx: number) => {
          // const { user_id, timestamp, url, caption, likes, likesData } = object;
          // const home = false;
          return (<ImagePost 
                    id={`img${idx}`} 
                    key={`key${idx}`} 
                    imagePostMetadata={imagePostMetadata}
                    // username={username} 
                    // user_id={ user_id } 
                    // url={url} 
                    // caption={caption} 
                    // likes={likes} 
                    // likesData={likesData} 
                    // timestamp={timestamp} 
                  />);
        })}
      </div>
    </div>
  )
};

export default Dashboard;