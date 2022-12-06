import React, { useState, useEffect, useLayoutEffect } from 'react';
// import { useParams } from 'react-router-dom';
import { UserPostsProps, ImagePostProps } from '../../types';
import ImagePost from './ImagePost';


const Posts =  (props: { userPostsData: UserPostsProps[] })  => {
  const { userPostsData } = props;
  const { username } = userPostsData[0];

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
                      imagePostMetadata={imagePostMetadata}
                    />);
            })
          }
        </div> 
    </div>
  )
};

export default Posts;