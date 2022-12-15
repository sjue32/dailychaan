/**
 * @jest-environment jsdom
 */

import React from 'react';
import About from '../client/components/About';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Testing About component', () => {

  beforeEach(() => {
    render(<About />);
  });

  it('renders an h2 tag with "About Daily Chaan" text', () => {
    expect(screen.getByText(/About Daily Chaan/)).toBeDefined();
  });
});