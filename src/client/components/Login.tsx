import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoggedInUserProp } from '../../types';
import checkLogin from '../helperFunctions/checkLogin';
import Loader from './Loader';
import LoginInput from './LoginInput';
import { loginInputUsernamePropData, loginInputPasswordPropData } from '../helperData/loginFormPropData';

const Login = ( props: { loggedInUser: LoggedInUserProp, setLoggedInUser: React.Dispatch<React.SetStateAction<LoggedInUserProp>> } ) => {

  const { loggedInUser, setLoggedInUser } = props;

  const [ details, setDetails ] = useState({ username: '', password: ''});
  const [ loginMessage, setLoginMessage ] = useState<string>('');
  const [ status, setStatus ] = useState<string>('idle');

  const navigate = useNavigate();

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus('pending');
    const response = await checkLogin({details, setStatus, loggedInUser, setLoggedInUser, setLoginMessage} );
    response ? setStatus('fulfilled') : setStatus('error');
    // if login fails, return to login? with error message displayed?
    response ? navigate('/user') : null;
    setDetails({ username: '', password: ''});
  };

  console.log('status: ', status);
  console.log('loginMessage: ', loginMessage);

  return(
    <div className="loginComponent">
      <form onSubmit={submitHandler} noValidate>
          <h2>Login</h2>
          <LoginInput id='username' value={details.username} onChange={e => setDetails({...details, username: e.target.value})} loginInputData={loginInputUsernamePropData} />
          <LoginInput id='password' value={details.password} onChange={e => setDetails({...details, password: e.target.value})} loginInputData={loginInputPasswordPropData} />
          <input type="submit" value="LOGIN" />
      </form>

      { status === 'error' ? <div>{loginMessage} </div> : null }
      { status === 'pending' ? 
      <Loader />
      : null }
    </div>
  )
};

export default Login;