import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CurrentUserContext } from './CurrentUserContext';

import { checkLogin } from '../helperFunctions/checkLogin';
import Loader from './Loader';
import LoginInput from './LoginInput';
import { loginInputUsernamePropData, loginInputPasswordPropData } from '../helperData/loginFormPropData';

import type { LoginDetailsProps, CurrentUserContextValue, LoginResponse } from '../../types';

// core style sheet
import '../style/login.css';

const Login = () => {

  const { currentUser, setCurrentUser } = useContext(CurrentUserContext) as CurrentUserContextValue;
  // console.log('LOGIN: useContext(CurrentUserContext)', useContext(CurrentUserContext));
  // console.log('LOGIN: CurrentUserContext', CurrentUserContext);


  const [ details, setDetails ] = useState<LoginDetailsProps>({ username: '', password: ''});
  const [ loginMessage, setLoginMessage ] = useState<string>('');
  const [ status, setStatus ] = useState<string>('idle');

  const navigate = useNavigate();

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus('pending');
    const loginResponse: LoginResponse = await checkLogin(details);

    const { verified, message } = loginResponse;
    if(verified) {
      const { username, user_posts, fav_users } = loginResponse;
      setCurrentUser({...currentUser, 
        loggedIn: true,
        username,
        posts: user_posts,
        fav_users, 
      });
      setStatus('fulfilled');
      navigate('/user');
    }
    else {
      setLoginMessage(message);
      setStatus('fulfilled');
      setDetails({ username: '', password: ''});
    }
  };

  // console.log('status: ', status);
  // console.log('loginMessage: ', loginMessage);

  return(
    <div className="loginComponent">
      <form className="loginForm" onSubmit={submitHandler} noValidate>
        <h2>Login</h2>
        <LoginInput id='username' value={details.username} onChange={e => setDetails({...details, username: e.target.value})} loginInputData={loginInputUsernamePropData} />
        <LoginInput id='password' value={details.password} onChange={e => setDetails({...details, password: e.target.value})} loginInputData={loginInputPasswordPropData} />
        <input className="submitButton" type="submit" value="LOGIN" />
      </form>

      { status === 'error' ? <div>{loginMessage} </div> : null }
      { status === 'pending' ? 
        <Loader /> : null }
      { status === 'fulfilled' ? <div>{loginMessage} </div> : null }
    </div>
  );
};

export default Login;