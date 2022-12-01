import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { LoggedInUserProp } from '../../types';

const NavBar = (props: { loggedInUser:LoggedInUserProp, setLoggedInUser:React.Dispatch<React.SetStateAction<LoggedInUserProp>> }) => {

  const { loggedInUser, setLoggedInUser } = props;
  const { username } = loggedInUser;

  const navigate = useNavigate();

  // handleClick function to logout
  const handleLogout = async () => {
    // fetch request to server to end session
    const response = await fetch(`/api/logout/${username}`);
    const data = await response.json();
    const { message } = data;
    console.log('handleLogout, message from server: ', message);

    setLoggedInUser({
      loggedIn: false,
      username: '',
      posts: [],
      fav_users: [],
      liked: {}
    });
    navigate('/');
    // navigate('/login');
  };

  // check if user is still authorized/logged in 
  // make GET request using username in params
  // if authorized, render user's page
  // otherwise logout user, and render public homepage
  const checkAuthorization = async () => {
    try {
      const { username } = loggedInUser;
      const response = await fetch(`api/login/${username}`);
      const data = await response.json();
      const { message } = data;
      console.log(message);
      return message == 'user is authorized' ? true : false;
    } catch(err) {
      console.error(err);
      console.log(err);
    }
  };

  const handleLoggedInUser = async () => {
    const status = await checkAuthorization();
    if(status) {
      return;
    } else {
      setLoggedInUser({
        loggedIn: false,
        username: '',
        posts: [],
        fav_users: [],
        liked: {}
      });
      navigate('/');
    }
  }

  // if loggedInUser.loggedIn is false, render Home, with public posts
  // if loggedInUser.loggedIn is true, Link is originally pointed at '/user', check if user is still authorized with onClick function
  // if function returns true, continue to allow render of Dashboard
  // if false, reset states of userLoggedIn, and loggedInUser, redirect to '/'

  return(
    <div className ="navBar">
      {
        loggedInUser.loggedIn ? <Link className="navBarLink" to="/user" onClick={ handleLoggedInUser }>Home</Link>
        : <Link className="navBarLink" to="/">Home </Link>
      }
      <Link className="navBarLink" to="/explore">Explore </Link>
      <Link className="navBarLink" to="/about">About </Link>
      { !loggedInUser.loggedIn ? <Link className="navBarLink" to="/login">Login </Link>
      : <Link className="navBarLink" to="/" onClick={handleLogout} >Logout</Link> }
    </div>
  )
};

export default NavBar;