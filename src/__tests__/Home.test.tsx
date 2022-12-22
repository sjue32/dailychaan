/**
 * @jest-environment jsdom
 */

import React from 'react';
import Home from '../client/components/Home';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import 'intersection-observer';
import userEvent from '@testing-library/user-event';

import { MobileProvider, MobileContext } from '../client/components/MobileContext';

import { newSampleGetPostData } from '../sample/sampleGetPostData';
const { Items } = newSampleGetPostData;


describe('render Home', () => {

  it('renders images', async () => {

    // const { isMobile } = MobileContext;
    const isMobile = false;

    const renderedHome = render(<MobileProvider><Home publicPostsData={Items} /></MobileProvider>);

    screen.debug();

    // images still not loading, has nothing to do with scrolling?
    // have to force images to load
    // need to research what forces images to load in react-lazy-load

  });


});