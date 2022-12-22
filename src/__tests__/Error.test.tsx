/**
 * @jest-environment jsdom
 */

import React from 'react';
import Error from '../client/components/Error';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Testing About component', () => {

  beforeEach(() => {
    render(<Error />);
  });

  it('renders text "There\'s been an error in loading your content." ', () => {
    expect(screen.getByText(/There's been an error in loading your content./)).toBeDefined();
  });

  it('renders text "We apologize for the inconvenience and hope to have this resolved soon. Thanks." ', () => {
    expect(screen.getByText(/We apologize for the inconvenience and hope to have this resolved soon. Thanks./)).toBeDefined();
  });

});