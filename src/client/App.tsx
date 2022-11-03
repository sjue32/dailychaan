import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import NavBar from './components/Navbar';
import Home from './components/Home';
import Explore from './components/Explore';
import About from './components/About';
import Posts from './components/Posts';
import Login from './components/Login';
import { ImageFrameProps, UsersData, ImageFrameComponentProp, LoggedInUserProp } from '../types';

const App = () => {

  const [ publicChaan, setPublicChaan ] = useState<any[]>([]);
  const [ usersList, setUsersList ] = useState<Record<string, UsersData>>({});
  const [ userPosts, setUserPosts ] = useState<Record<string, ImageFrameComponentProp[]>>({});
  const [ isLoading, setIsLoading ] = useState<boolean>(true);
  const [ loggedInUser, setLoggedInUser ] = useState<LoggedInUserProp>({
    loggedIn: false,
    username: '',
    posts: [],
    fav_users: [],
    liked: {}
  });

  const location = useLocation();

  return (
    <div className="main">
      <NavBar loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />
      <TransitionGroup>
        <CSSTransition key={location.key} classNames="fade" timeout={300}>
          <Routes location={location}>
            <Route path="/" element={<Home data={ publicChaan } loggedInUser={loggedInUser} isLoading={isLoading} setIsLoading={setIsLoading} />} />
            <Route path="/explore" element ={<Explore user_data={ usersList } setUserPosts={setUserPosts} user_posts={ userPosts }  />} />
            <Route path="/about" element ={<About />} />
            <Route path ="/posts/:user_id" element ={<Posts user_posts={ userPosts } setUserPosts={setUserPosts} isLoading={isLoading} setIsLoading={setIsLoading} /> } />
            <Route path="/login" element ={<Login loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />} />
          </Routes>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
}

export default App;