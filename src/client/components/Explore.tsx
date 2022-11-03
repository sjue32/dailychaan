import React from 'react';
import { Link } from 'react-router-dom';
import { UsersData, ImageFrameComponentProp } from '../../types';


const Explore = (props: { user_data: Record<string, UsersData>, 
  setUserPosts: React.Dispatch<React.SetStateAction<{}>>,
  user_posts: Record<string, ImageFrameComponentProp[]> }) => {

  const { user_data, setUserPosts, user_posts } = props;
  // console.log('inside Explore Comp, user_data: ', user_data);

  const chaansArray = Object.values(user_data);

  const chaanLinkArray: any[] = [];

  chaansArray.forEach((data, idx) => {
    const { user_id, username } = data;
    chaanLinkArray.push(
      <div className="chaanLink" key={`chaanLink${idx}`}>
        {/* <button onClick={() => getUserPosts(user_id)}><Link to={`/posts/${user_id}`} > {username} </Link></button> */}
        <button><Link to={`/posts/${user_id}`} > {username} </Link></button>
      </div>
  )});



  return(
    <div className="exploreComponent">
      <h1>Explore Chaans Page</h1>
      <div>{chaanLinkArray}</div>

    </div>
  )
};

export default Explore;