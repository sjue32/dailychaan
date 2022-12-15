import React from 'react';
import type { ImagePostProps, UserPostsProps, MobileContextValue } from '../../types';
import ImagePost from './ImagePost';

import { useContext } from 'react';
import { MobileContext } from './MobileContext';


const Home = (props: { publicPostsData: UserPostsProps[] })  => {

  const { publicPostsData } = props;

  const { isMobile } = useContext(MobileContext) as MobileContextValue;

  console.log('Home component rendered');
  console.log('Home Component: publicPostsData: ', publicPostsData);
  console.log('Home component, isMobile: ', isMobile);

  return(
    <div className="homeComponent">
      <h1>Daily Chaan</h1>
      <div className="homeComponentInnerContainer">
        {
          publicPostsData.map((imagePostMetadata: ImagePostProps, idx: number) => {
            return(<ImagePost 
              id={`img${idx}`} 
              key={`key${idx}`} 
              imagePostMetadata={imagePostMetadata}
              isMobile={isMobile}
            />);
          })
        }
      </div>
    </div>
  );
};

export default Home;