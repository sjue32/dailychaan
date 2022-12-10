import React from 'react';
import type { ImageFrameProps, ImagePostProps } from '../../types';
import LazyLoad from 'react-lazy-load';
import ImagePostText from './ImagePostText';

const ImagePost = (props: { id: string, imagePostMetadata: ImagePostProps, isMobile: boolean }) => {
  const { id, isMobile, imagePostMetadata } = props;
  const { url_small, url_large } = imagePostMetadata;

  // check mobile state, if mobile, use url_small, otherwise pass in url_small to img src in LazyLoad
  console.log('imagePost: isMobile: ', isMobile);
  return (
    <div className="imageContainer">
      <div id={id} className="imageFrame">
        <LazyLoad className="lazyLoadImg" offset={500} height ={525} onContentVisible={
          () => {console.log('image loaded');
          const currentImg: HTMLElement = document.querySelector(`#${id} .lazyLoadImg`);
          currentImg.style.height = 'auto';
        }} 
        >
          <img src={isMobile ? url_small : url_large} width="94%" className="postImg" />
        </LazyLoad>
      </div>
      <ImagePostText 
        imagePostMetadata={imagePostMetadata}
      />
    </div>
  );
}

export default ImagePost;