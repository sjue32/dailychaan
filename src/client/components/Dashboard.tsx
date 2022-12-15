import React, { useContext } from 'react';
import ImagePost from './ImagePost';
import type { ImagePostProps, CurrentUserProps, CurrentUserContextValue, MobileContextValue } from '../../types';
import { MobileContext } from './MobileContext';

import { CurrentUserContext } from './CurrentUserContext';

const Dashboard = () => {

  const { currentUser } = useContext(CurrentUserContext) as CurrentUserContextValue;
  const { isMobile } = useContext(MobileContext) as MobileContextValue;

  const { username, posts } = currentUser as CurrentUserProps;
  // unused var: loggedIn, fav_users

  return(
    <div className='postsComponent'>
      <h2>{username} Feed</h2>
      <div className="postsComponentInnerContainer">
        { posts.map((imagePostMetadata: ImagePostProps, idx: number) => {

          return (<ImagePost 
            id={`img${idx}`} 
            key={`key${idx}`} 
            isMobile={isMobile}
            imagePostMetadata={imagePostMetadata}
          />);
        })}
      </div>
    </div>
  );
};

export default Dashboard;