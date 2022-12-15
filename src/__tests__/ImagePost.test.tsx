/**
 * @jest-environment jsdom
 */

import React from 'react';
import ImagePost from '../client/components/ImagePost';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe.skip('Unit testing ImagePost', () => {
  const props = {
    id:'01',
    // key: 'key0',
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
    const { id, isMobile, imagePostMetadata } = props;
    render(<ImagePost id={id} isMobile={isMobile} imagePostMetadata={imagePostMetadata} />);

  });
  

  it('renders an image element', () => {
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', 'https://dailychaan-public-photos.s3.us-east-2.amazonaws.com/13301363_10104985284945809_7979679298381378844_o.jpeg');
  });

  it('it renders a paragraph element', () => {
    expect(screen.getByText(/Testing 123/)).toBeDefined();
  });
});
