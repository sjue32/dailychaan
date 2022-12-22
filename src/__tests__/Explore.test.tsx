/**
 * @jest-environment jsdom
 */

import React from 'react';
import Explore from '../client/components/Explore';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import { sampleGetUsersDataFE } from '../sample/sampleGetUsersData';

// const sampleGetUsersData = {
//   main_chaan: {
//     username: 'Main Chaan',
//     user_id: 1,
//   },
//   cafe_chaan: {
//     username: 'Cafe Chaan',
//     user_id: 2,
//   },
//   chinese_chaan: {
//     username: 'Chinese Chaan',
//     user_id: 3,
//   }
// };

describe('Checking Explore component', () => {

  beforeEach(() => {
    render(
      <Router>
        <Explore userListData={sampleGetUsersDataFE} />
      </Router>
    );
  });

  it('contains same number of links as sample data', () => {
    const dataLength = Object.values(sampleGetUsersDataFE).length;
    const links = screen.getAllByRole('link');

    expect(links.length).toEqual(dataLength);
  });

  it('contains links with link path matching user_ids from the sample data', () => {

    const dataArray = Object.values(sampleGetUsersDataFE);
    const user_id_array = dataArray.map(userObject => userObject.user_id);
    const links = screen.getAllByRole('link');


    for(let i = 0; i < user_id_array.length; i++) {
      const currentLink = links[i];

      expect(currentLink).toHaveAttribute('href',`/posts/${user_id_array[i]}`);
    }

  });

});