import React from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { UsersData, ImagePostProp } from '../../types';
import useFetch from '../custom_hooks/useFetch';
import Error from './Error';

// user_data: Record<string, UsersData>

const Explore = () => {

  console.log('inside Explore Comp');

  const usersListUrl = '/api/users/users';
  const { isLoading, isError, data } = useFetch(usersListUrl);

  const usersListArray = Object.values(data);

  return(
    <div className="exploreComponent">
      <div className="exploreInnerContainer">
        <h1>Explore Chaans Page</h1>

        { isLoading ? <div className="testSpinner">
        <ThreeDots 
          height="80"
          width="80"
          radius="9"
          color="#4fa94d"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          // wrapperClassName=""
          visible={true}
        />
      </div> : 

        <div>
          { isError ? <Error /> :
            usersListArray.map((object: UsersData, idx) => {
              const { user_id, username } = object;
              return(<div className="chaanLink" key={`chaanLink${idx}`}>
              <button><Link to={`/posts/${user_id}`} > {username} </Link></button>
            </div>)
            })
          }
        </div>
  } 

      </div>
    </div>
  
  )
};

export default Explore;