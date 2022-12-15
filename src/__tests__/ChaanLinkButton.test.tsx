/**
 * @jest-environment jsdom
 */

import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ChaanLinkButton from '../client/components/ChaanLinkButton';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Testing About component', () => {

  const username = 'username1';
  const user_id = 1;

  beforeEach(() => {
    render(
      <Router>
        <ChaanLinkButton username={username} user_id={user_id}  />
      </Router>);
  });

  // check for link pointing to route using user_id 'posts/<user_id>'
  it('contains a link to username\'s posts, /posts/<username> ', () => {
    const link = screen.getByRole('link');

    expect(link).toHaveAttribute('href', '/posts/1');
  });

  // check for text containing username
  it('renders username as a text', () => {
    expect(screen.getByText(/username1/)).toBeDefined();
  });
});