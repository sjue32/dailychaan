import React from 'react';
import { ImagePostProps } from '../../types';
import ImagePost from './ImagePost';

import { UserPostsProps } from '../../types';

const Home = (props: { publicPostsData: UserPostsProps[] })  => {

  const { publicPostsData } = props;

  console.log('Home component rendered');
  console.log('Home Component: publicPostsData: ', publicPostsData);

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
                  />)
          })
        }
      </div>
    </div>
  )
};

export default Home;