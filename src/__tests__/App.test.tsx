/**
 * @jest-environment jsdom
 */

 import React from 'react';
 import App from '../client/App';
 import { render, screen } from '@testing-library/react';
 import '@testing-library/jest-dom';

 describe.skip('Unit testing App component', () => {

   const urlSource = ['https://dailychaan-public-photos.s3.us-east-2.amazonaws.com/11802736_10104167012944459_5302688321690486926_o.jpeg',
   'https://dailychaan-public-photos.s3.us-east-2.amazonaws.com/13301363_10104985284945809_7979679298381378844_o.jpeg',
   'https://dailychaan-public-photos.s3.us-east-2.amazonaws.com/13323735_10104999104426459_2516400911121474739_o.jpeg',
   'https://dailychaan-public-photos.s3.us-east-2.amazonaws.com/13329358_10104985284307089_9186752348523393200_o.jpeg',
   'https://dailychaan-public-photos.s3.us-east-2.amazonaws.com/13329600_10104990389810619_7757854025143533726_o.jpeg',
   'https://dailychaan-public-photos.s3.us-east-2.amazonaws.com/13391471_10105000520498639_6651838389706195689_o.jpeg',
   'https://dailychaan-public-photos.s3.us-east-2.amazonaws.com/13391551_10104998862885509_2916281007743705705_o.jpeg',
   'https://dailychaan-public-photos.s3.us-east-2.amazonaws.com/13415502_10105000518268109_2615196590672735618_o.jpeg'];
  
   beforeEach(() => {
    render(<App />);

  });


  it('renders img elements', () => {
    const image = screen.getAllByRole('img');
    
    image.forEach((img, idx) => {
      expect(img).toHaveAttribute('src', `${urlSource[idx]}`);
    })
  });

  it('renders paragraph elements', () => {
    const text = screen.getAllByText(/Caption:/);

    text.forEach((caption, idx) => {
      expect(caption).toHaveTextContent(`Testing ${idx}`);
    });
  })

 })

