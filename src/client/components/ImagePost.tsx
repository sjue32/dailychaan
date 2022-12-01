import React from 'react';
import { ImageFrameProps } from '../../types';
import LazyLoad from 'react-lazy-load';
import ImagePostText from './ImagePostText';

const ImagePost = (props: ImageFrameProps) => {
  const { username, id, user_id, timestamp, url, caption, likes, setIsLoading, home } = props;

  // requires img url from parent component, caption string
  // will contain image, caption

  return (
    <div className="imageContainer">
      <div id={id} className="imageFrame">
        <LazyLoad className="lazyLoadImg" offset={500} height ={525} onContentVisible={
          () => {console.log('image loaded');
          const currentImg: HTMLElement = document.querySelector(`#${id} .lazyLoadImg`);
          // console.log('currentImg: ', currentImg);
          currentImg.style.height = 'auto';
        }} 
        >
          <img src={url} width="94%" className="postImg" />
        </LazyLoad>
      </div>
      <ImagePostText 
        user_id={user_id} 
        username={username} 
        caption={caption} 
        likes={likes} 
        timestamp={timestamp} 
      />
    </div>
  );
}

const MemoImagePost = React.memo(ImagePost);

export default MemoImagePost;