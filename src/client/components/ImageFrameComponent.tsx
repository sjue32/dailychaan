import React from 'react';
import { ImageFrameProps } from '../../types';

const ImageFrameComponent = (props: ImageFrameProps) => {
  const { imgUrl, alt, caption } = props;

  // requires img url from parent commponent, caption string
  // will contain image, caption

  return (
    <div>
      <img src={imgUrl} alt={alt}></img>
      <p>Caption: {caption}</p>
    </div>
  );
}

export default ImageFrameComponent;