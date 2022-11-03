import React from 'react';
import { ImageFrameProps } from '../../types';
import LazyLoad from 'react-lazy-load';

const ImageFrameComponent = (props: ImageFrameProps) => {
  const { user_id, timestamp, url, caption, likes, setIsLoading, home } = props;

  console.log('ImageFC loading: user_id: ', user_id, ', url: ', url, ', setIsLoading: ', setIsLoading, 'home: ', home)

  // requires img url from parent component, caption string
  // will contain image, caption

  return (
    <div className="imageContainer">
      <div className="imageFrame">
        {
          <LazyLoad className="lazyLoadImg" offset={0} height ={525} onContentVisible={
            () => {console.log('image loaded')
          }} 
          >
            <img src={url} width="94%" className="postImg" />
          </LazyLoad>
        }
      </div>
      <p>User: {user_id } Caption: {caption} Likes: { likes }</p>
    </div>
  );
}

const MemoImageFrameComponent = React.memo(ImageFrameComponent);

export default MemoImageFrameComponent;