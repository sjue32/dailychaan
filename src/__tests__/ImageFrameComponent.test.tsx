/**
 * @jest-environment jsdom
 */

import React from 'react';
import ImageFrameComponent from '../client/components/ImageFrameComponent';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Unit testing ImageFrameComponent', () => {
  const props = {
    imgUrl: 'https://dailychaan-public-photos.s3.us-east-2.amazonaws.com/13301363_10104985284945809_7979679298381378844_o.jpeg',
    alt: 'churro',
    caption: 'Testing 123'
  }

  beforeEach(() => {
    render(<ImageFrameComponent {...props}  />);

  });
  

  it('renders an image element', () => {
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('alt', 'churro');
    expect(image).toHaveAttribute('src', 'https://dailychaan-public-photos.s3.us-east-2.amazonaws.com/13301363_10104985284945809_7979679298381378844_o.jpeg');
  });

  it('it renders a paragraph element', () => {
    expect(screen.getByText(/Testing 123/)).toBeDefined();
  })
});
