/**
 * @jest-environment jsdom
 */

import React from 'react';
import ImagePost from '../client/components/ImagePost';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import 'intersection-observer';
import userEvent from '@testing-library/user-event';

describe.skip('Unit testing ImagePost', () => {
  const props = {
    id:'01',
    isMobile: false,
    imagePostMetadata: {
      username: 'username01',
      user_id: 1,
      timestamp: '123',
      url_small: 'https://dailychaan-public.s3.amazonaws.com/11802736_10104167012944459_5302688321690486926_o.jpg',
      url_large: 'https://dailychaan-public.s3.amazonaws.com/11802736_10104167012944459_5302688321690486926_o_large.jpg',
      caption: 'Testing 123',
      likes: 1,
      likesData: {},
    },
  };

  beforeEach(() => {
    // const { id, isMobile, imagePostMetadata } = props;
    // render(<ImagePost id={id} isMobile={isMobile} imagePostMetadata={imagePostMetadata} />);

  });
  

  it('renders an image element', async () => {

    const { id, isMobile, imagePostMetadata } = props;
    const renderedImagePost = render(<ImagePost id={id} isMobile={isMobile} imagePostMetadata={imagePostMetadata} />);

    // window.scrollTo({ top: 600, left: 0});
    fireEvent.scroll(window, { target: { scrollY: 600 }});

    // const imagesArray = renderedImagePost.getAllByRole('img');
    const imagesArray2 = await screen.getAllByRole('img');

    // console.log('imagesArray2 screen: ', imagesArray2);


    imagesArray2.forEach((img, idx) => {
      console.log('currentIdx: ', idx);
      // console.log('currentImg: ', img);
    });

    // const imagesArray = renderedImagePost.getAllByRole('img');


    // console.log('renderedImagePost: ', renderedImagePost);

    // imagesArray.forEach((img, idx) => {
    //   console.log('currentIdx: ', idx);
    //   // console.log('currentImg: ', img);
    // });

    await screen.debug();

    // console.log('image: ', image);
    // expect(image).toHaveAttribute('src', 'https://dailychaan-public.s3.amazonaws.com/11802736_10104167012944459_5302688321690486926_o_large.jpg');
  });

  // it('it renders a paragraph element', () => {
  //   expect(screen.getByText(/Testing 123/)).toBeDefined();
  // });
});
