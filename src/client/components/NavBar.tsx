import React from 'react';
import { Link } from 'react-router-dom';
import { LoggedInUserProp } from '../../types';

const NavBar = (props: { loggedInUser:LoggedInUserProp, setLoggedInUser:React.Dispatch<React.SetStateAction<LoggedInUserProp>> }) => {

  const { loggedInUser, setLoggedInUser } = props;

  // handleClick function to logout
  const handleLogout = () => {
    setLoggedInUser({
      loggedIn: false,
      username: '',
      posts: [],
      fav_users: [],
      liked: {}
    });
  };

  return(
    <div className ="navBar">
      <Link className="navBarLink" to="/">Home </Link>
      <Link className="navBarLink" to="/explore">Explore </Link>
      <Link className="navBarLink" to="/about">About </Link>
      { !loggedInUser.loggedIn ? <Link className="navBarLink" to="/login">Login </Link>
      : <Link className="navBarLink" to="/" onClick={handleLogout} >Logout</Link> }
    </div>
  )

};

export default NavBar;

// when we click the logout Link (onClick???), we want to invoke a function to logout/end session at server
// and redirect user back to home page as a public user
// and reset loggedInUser state