import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ImagePostProp } from '../../types';
import ImagePost from './ImagePost';


const Posts =  (props: { 
  user_posts: Record<string, ImagePostProp[]>,
  setUserPosts: React.Dispatch<React.SetStateAction<{}>> })  => {
  const { user_posts, setUserPosts } = props;
  const { user_id } = useParams();

  // invoke to fetch user posts data
  useLayoutEffect( () => {
    console.log('inside Posts useEffect');
    const getUserPosts = async (user_id: string ) => {

      const response = await fetch(`/api/posts/${user_id}`);
      const data = await response.json();
      console.log('inside getUserPosts after fetch, data: ', data);
      setUserPosts({ [user_id]: data});
    };
    getUserPosts(user_id);
    
  },[]);

  return(
    <div className="postsComponent">
      {/* <h1>User Posts</h1> */}
        {/* <div> */}
          { 
            user_posts[user_id]?.map((object: ImagePostProp, idx: number) => {
            const { username, user_id, timestamp, url, caption, likes } = object;
            return(<ImagePost key={`key${idx}`} id={`img${idx}`} username={username} user_id={user_id} url={url} 
              caption={caption} likes={likes} timestamp={timestamp} home={false} style={{opacity: 1}} />);
          })
          }
        {/* </div>  */}
    </div>
  )
};

export default Posts;