import React from 'react';
import type { UserPostsProps, ImagePostProps, MobileContextValue } from '../../types';
import ImagePost from './ImagePost';
import { useContext } from 'react';
import { MobileContext } from './MobileContext';

const Posts =  (props: { userPostsData: UserPostsProps[] })  => {
  const { userPostsData } = props;
  const { username } = userPostsData[0];
  const { isMobile } = useContext(MobileContext) as MobileContextValue;


  return(
    <div className="postsComponent">
      <h1>{username}</h1>
        <div className="postsComponentInnerContainer">
          { 
            userPostsData?.map((imagePostMetadata: ImagePostProps, idx: number) => {
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