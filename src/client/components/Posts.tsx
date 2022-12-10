import React, { useState, useEffect, useLayoutEffect } from 'react';
// import { useParams } from 'react-router-dom';
import type { UserPostsProps, ImagePostProps } from '../../types';
import ImagePost from './ImagePost';
import { useContext } from 'react';
import { MobileContext } from './MobileContext';

const Posts =  (props: { userPostsData: UserPostsProps[] })  => {
  const { userPostsData } = props;
  const { username } = userPostsData[0];

  const { isMobile } = useContext(MobileContext);


  return(
    <div className="postsComponent">
      <h1>{username}</h1>
        <div className="postsComponentInnerContainer">
          { 
            userPostsData?.map((imagePostMetadata: ImagePostProps, idx: number) => {
            // const { username, user_id, timestamp, url, caption, likes, likesData } = object;
            return(<ImagePost 
                      key={`key${idx}`} 
                      id={`img${idx}`} 
                      isMobile={isMobile}
                      imagePostMetadata={imagePostMetadata}
                    />);
            })
          }
        </div> 
    </div>
  )
};

export default Posts;