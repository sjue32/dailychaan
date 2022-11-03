import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoggedInUserProp } from '../../types';

const Login = ( props: { loggedInUser: LoggedInUserProp, setLoggedInUser: React.Dispatch<React.SetStateAction<LoggedInUserProp>> } ) => {

  const { loggedInUser, setLoggedInUser } = props;

  const [ details, setDetails ] = useState({
    username: '', password: ''
  });
  const [ loginMessage, setLoginMessage ] = useState<string>('');

  const navigate = useNavigate();

  // declare object with some dummy data 
  const testUser = 'public';
  const testPassword = 'public123';

  const checkLogin =  async (details: {username: string, password: string}) => {

    console.log('passed in username: ', details.username, ', password: ', details.password);
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        username: details.username,
        password: details.password,
      }),
    };
    const response = await fetch('/api/login', requestOptions).then(res => res.json());
    const { message, user_posts } = response;
    // const message = response.message;
    console.log('message from login server: ', message);
    
    // unsuccessful login
    if(message == 'username does not exist' || message == `username / password does not match`) {
        setLoginMessage(message);
    //  successful login
    } else if(message == 'user verified') {
      console.log('LOGGED IN SUCCESSFULLY');
      setLoggedInUser({ ...loggedInUser, loggedIn: true, username: details.username, posts: user_posts });
      console.log('response.posts', response.user_posts);
    }
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    checkLogin(details);
    navigate('/');
  }

  return(
    <div className="loginComponent">
      <form onSubmit={submitHandler}>
        <div className="form-inner">
          <h2>Login</h2>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input type="text" name="username" id="username" onChange={e => setDetails({...details, username: e.target.value})} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" name="password" id="password" onChange={e => setDetails({...details, password:e.target.value})} />
          </div>
          <input type="submit" value="LOGIN" />

        </div>
      </form>
      {loginMessage == "" ? null : loginMessage}
    </div>
  )
};

export default Login;