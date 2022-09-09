import React from 'react';
import ImageFrameComponent from './components/ImageFrameComponent';
import { ImageFrameProps } from '../types';

const App = () => {
  // public image array
  // temporarily hard coded until URL's are cached or saved in database
  const public_images = ['https://dailychaan-public-photos.s3.us-east-2.amazonaws.com/11802736_10104167012944459_5302688321690486926_o.jpeg',
                        'https://dailychaan-public-photos.s3.us-east-2.amazonaws.com/13301363_10104985284945809_7979679298381378844_o.jpeg',
                        'https://dailychaan-public-photos.s3.us-east-2.amazonaws.com/13323735_10104999104426459_2516400911121474739_o.jpeg',
                        'https://dailychaan-public-photos.s3.us-east-2.amazonaws.com/13329358_10104985284307089_9186752348523393200_o.jpeg',
                        'https://dailychaan-public-photos.s3.us-east-2.amazonaws.com/13329600_10104990389810619_7757854025143533726_o.jpeg',
                        'https://dailychaan-public-photos.s3.us-east-2.amazonaws.com/13391471_10105000520498639_6651838389706195689_o.jpeg',
                        'https://dailychaan-public-photos.s3.us-east-2.amazonaws.com/13391551_10104998862885509_2916281007743705705_o.jpeg',
                        'https://dailychaan-public-photos.s3.us-east-2.amazonaws.com/13415502_10105000518268109_2615196590672735618_o.jpeg'];
  // need to specify correct type for img elements
  const imgComponentArray: any[] = [];

  public_images.forEach((url, idx) => {
    const sampleCaption = `Testing ${idx}`;
    imgComponentArray.push(<ImageFrameComponent imgUrl={url} key={`caption${idx}`} caption={sampleCaption} />);
  });

  return (
    <div>
      <h1>Daily Chaan!</h1>
      <div>{imgComponentArray}</div>
    </div>
  );
}

export default App;