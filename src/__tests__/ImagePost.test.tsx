/**
 * @jest-environment jsdom
 */

import React from 'react';
import ImagePost from '../client/components/ImagePost';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Unit testing ImagePost', () => {
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

  // jest.mock('../images/icons8-savouring-delicious-food-face-48.png', () => {
  //   return {};
  // });

  beforeEach(() => {
    const { id, isMobile, imagePostMetadata } = props;
    render(<ImagePost id={id} isMobile={isMobile} imagePostMetadata={imagePostMetadata} />);

  });
  

  it('renders an image element', () => {
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', 'https://dailychaan-public.s3.amazonaws.com/11802736_10104167012944459_5302688321690486926_o_large.jpg');
  });

  // it('it renders a paragraph element', () => {
  //   expect(screen.getByText(/Testing 123/)).toBeDefined();
  // });
});
