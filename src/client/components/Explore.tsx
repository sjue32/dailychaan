import React from 'react';
import { Link } from 'react-router-dom';
import { UsersData, ImagePostProp, ExploreChaanListDataProps, ExploreChaanUserDataProps } from '../../types';
import useFetch from '../custom_hooks/useFetch';

import ChaanLinkButton from './ChaanLinkButton';
import Loader from './Loader';
import Error from './Error';

// user_data: Record<string, UsersData>

// const Explore = ({ exploreChaanListData }: ExploreChaanListDataProps) => {
const Explore = (props: { exploreChaanListData: ExploreChaanListDataProps }) => {


  const { exploreChaanListData } = props;

  console.log('inside Explore Comp');

  // const usersListUrl = '/api/users/users';
  // const { isLoading, isError, data } = useFetch(usersListUrl);

  const usersListArray: ExploreChaanUserDataProps[] = Object.values(exploreChaanListData);

  return(
    <div className="exploreComponent">
      <h1>Explore Chaans Page</h1>
      <div className="exploreInnerContainer">
{/* 
        { isLoading ? <div className="testSpinner">
          <Loader />
        </div> : 

          <div>
            { isError ? <Error /> :
              usersListArray.map((object: UsersData, idx) => {
                const { user_id, username } = object;
                return(<ChaanLinkButton key={`chaanLink${idx}`} user_id={user_id} username={username} />)
              })
            }
          </div>
        }  */}

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