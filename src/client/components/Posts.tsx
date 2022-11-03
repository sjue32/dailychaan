import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ImageFrameComponentProp } from '../../types';
import ImageFrameComponent from './ImageFrameComponent';


const Posts =  (props: { 
  user_posts: Record<string, ImageFrameComponentProp[]>,
  isLoading: boolean,
  setUserPosts: React.Dispatch<React.SetStateAction<{}>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>> })  => {
  const { user_posts, setUserPosts, isLoading, setIsLoading } = props;
  const { user_id } = useParams();

  // invoke to fetch user posts data
  // useLayoutEffect( () => {
  //   console.log('inside Posts useEffect');
  //   const getUserPosts = async (user_id: string ) => {
  //     const response = await fetch(`/api/posts/${user_id}`);
  //     const data = await response.json();
  //     console.log('inside getUserPosts after fetch, data: ', data);
  //     setUserPosts({ [user_id]: data});
  //   };
  //   getUserPosts(user_id);

  // }, []);

  // const postsArray = user_posts[user_id];
  
  // const timeNow = new Date();
  // console.log('time now:', timeNow.getTime());

  return(
    <div className="postsComponent">
      <h1>User Posts</h1>
        <div>
          { 
              isLoading ? 
              user_posts[user_id]?.map((object: ImageFrameComponentProp, idx: number) => {
                const { user_id, timestamp, url, caption, likes } = object;
                return(<ImageFrameComponent key={`key${idx}`} user_id={user_id} url={url} 
                  caption={caption} likes={likes} timestamp={timestamp} home={false} style={{opacity: 0}}
                  setIsLoading={setIsLoading} />);
              }) 
              : user_posts[user_id]?.map((object: ImageFrameComponentProp, idx: number) => {
                const { user_id, timestamp, url, caption, likes } = object;
                return(<ImageFrameComponent key={`key${idx}`} user_id={user_id} url={url} 
                  caption={caption} likes={likes} timestamp={timestamp} home={false} style={{opacity: 1}}
                  setIsLoading={setIsLoading}  />);
              })
          }
        </div> 
    </div>
  )
};

export default Posts;