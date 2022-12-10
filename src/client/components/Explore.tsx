import React from 'react';
import type { UsersData, ExploreChaanListDataProps, ExploreChaanUserDataProps } from '../../types';
import ChaanLinkButton from './ChaanLinkButton';

const Explore = (props: { userListData: ExploreChaanListDataProps }) => {

  const { userListData } = props;

  console.log('inside Explore Comp: exploreChaanListData: ', userListData);

  const usersListArray: ExploreChaanUserDataProps[] = Object.values(userListData);
  console.log('inside Explore, usersListArray: ', usersListArray);

  return(
    <div className="exploreComponent">
      <h1>Explore Chaans Page</h1>
      <div className="exploreInnerContainer">
        {
          usersListArray.map((object: UsersData, idx) => {
            const { user_id, username } = object;
            return(<ChaanLinkButton key={`chaanLink${idx}`} user_id={user_id} username={username} />)
          })
        }
      </div>
    </div>
  )
};

export default Explore;