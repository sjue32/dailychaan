/**
 * @jest-environment jsdom
 */

import React from 'react';
import * as reactRouterDom from 'react-router';
import Login from '../client/components/Login';
import * as checkLoginModule from '../client/helperFunctions/checkLogin';
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { CurrentUserProvider } from '../client/components/CurrentUserContext';
import { BrowserRouter as Router} from 'react-router-dom';

import { loginSuccess, loginFail } from '../sample/sampleCheckLoginData';

describe('checking Login functionality', () => {

  const mockCheckLogin = jest.spyOn(checkLoginModule, 'checkLogin');

  afterEach( async () => {
    mockCheckLogin.mockReset();
  });

  it('check username and password input values', async () => {
    // 
    const navigate = jest.fn();
    jest.spyOn(reactRouterDom, 'useNavigate').mockImplementation(() => navigate);

    mockCheckLogin.mockResolvedValue(loginSuccess);

    const renderedLogin = render(
      <Router>
        <CurrentUserProvider>
          <Login />
        </CurrentUserProvider>
      </Router>
    );
    const usernameInput = await renderedLogin.getByPlaceholderText('Username') as HTMLInputElement;
    await user.type(usernameInput, 'user1');
    expect(usernameInput.value).toEqual('user1');

    const passwordInput = await renderedLogin.getByPlaceholderText(/password/i) as HTMLInputElement;
    await user.type(passwordInput, 'user123!');
    expect(passwordInput.value).toEqual('user123!');

    // grab submit button
    const submitButton = renderedLogin.getByRole('button');
    console.log('button', submitButton);

    await user.click(submitButton);
    expect(mockCheckLogin).toHaveBeenCalled();
    // check that mock navigate function has been invoked
    expect(navigate).toHaveBeenCalledWith('/user');

  });
  
  // mock checkLogin (this has a fetch inside) - can mock returned value
  // currentUser state is updated to match sample data

  it('will display a login failure message when checkLogin fails', async () => {
    mockCheckLogin.mockResolvedValue(loginFail);

    const renderedLogin = render(
      <Router>
        <CurrentUserProvider>
          <Login />
        </CurrentUserProvider>
      </Router>
    );
    const usernameInput = renderedLogin.getByPlaceholderText('Username') as HTMLInputElement;
    await user.type(usernameInput, 'user1');
    expect(usernameInput.value).toEqual('user1');

    const passwordInput = renderedLogin.getByPlaceholderText(/password/i) as HTMLInputElement;
    await user.type(passwordInput, 'user123!');
    expect(passwordInput.value).toEqual('user123!');

    // grab submit button
    const submitButton = renderedLogin.getByRole('button');
    // console.log('button', submitButton);

    await user.click(submitButton);
    expect(mockCheckLogin).toHaveBeenCalled();

    // check that input fields are cleared are login
    expect(usernameInput.value).toEqual('');
    expect(passwordInput.value).toEqual('');
  });

  it('renders an error message when incorrectly formatted username/pw typed in', async () => {
    
    const usernameErrorMessage = 'Username should be between 6 - 20 letters or numbers';
    const passwordErrorMessage = 'Required: at least 6 characters, contains at least one letter, one number, and one special character';

    const renderedLogin = render(
      <Router>
        <CurrentUserProvider>
          <Login />
        </CurrentUserProvider>
      </Router>
    );
    const usernameInput = renderedLogin.getByPlaceholderText('Username') as HTMLInputElement;
    const passwordInput = renderedLogin.getByPlaceholderText(/password/i) as HTMLInputElement;
    await user.type(usernameInput, 'a');
    await user.type(passwordInput,'.');
    await user.type(usernameInput, 'b');
    const generatedUsernameErrorMessage = screen.getByText(usernameErrorMessage);
    expect(generatedUsernameErrorMessage.innerHTML).toEqual(usernameErrorMessage);

    const generatedPasswordErrorMessage = screen.getByText(passwordErrorMessage);
    expect(generatedPasswordErrorMessage.innerHTML).toEqual(passwordErrorMessage);
  });

  // Loader is rendered initially while status is pending
  // a status pending has to be triggered for Loader to render
  // it('renders Loader during initial loading stage', async () => {

  //   const renderedLogin = render(
  //     <Router>
  //       <CurrentUserProvider>
  //         <Login />
  //       </CurrentUserProvider>
  //     </Router>
  //   );

  //   const loaderComponent = renderedLogin.getByTestId('loader');
  //   expect(loaderComponent).toBeDefined();
  //   console.log('loaderComponent', loaderComponent);

  // });

});