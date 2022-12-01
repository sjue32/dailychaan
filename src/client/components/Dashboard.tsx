import React from 'react';
import MemoImagePost from './ImagePost';
import { ImagePostProp, LoggedInUserProp } from '../../types';


const Dashboard = ( props: { loggedInUser: LoggedInUserProp  }) => {

  const { loggedInUser } = props;
  const { username, posts, fav_users, liked } = loggedInUser;

  return(
    <div className='postsComponent'>
      <h2>{username} Feed</h2>
      <div>
        { posts.map((object: ImagePostProp, idx: number) => {
          const { user_id, timestamp, url, caption, likes } = object;
          const home = false;
          return (<MemoImagePost id={`img${idx}`} key={`key${idx}`} username={username} user_id={ user_id } 
            url={url} caption={caption} likes={likes} timestamp={timestamp} home={home} />);
        })}
      </div>
    </div>
  )
};

export default Dashboard;