import React from 'react';
import { ImageFrameProps, ImagePostProps } from '../../types';
import LazyLoad from 'react-lazy-load';
import ImagePostText from './ImagePostText';

const ImagePost = (props: { id: string, imagePostMetadata: ImagePostProps }) => {
  const { id, imagePostMetadata } = props;
  const { url } = imagePostMetadata;

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
        imagePostMetadata={imagePostMetadata}
        // user_id={user_id} 
        // username={username} 
        // caption={caption} 
        // likes={likes} 
        // likesData={likesData}
        // timestamp={timestamp} 
      />
    </div>
  );
}

export default ImagePost;

// const MemoImagePost = React.memo(ImagePost);

// export default MemoImagePost;