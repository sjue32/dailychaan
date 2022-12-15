import type { CheckLoginProps} from '../../types';

const checkLogin =  async (props: CheckLoginProps) => {

  const { details, setStatus, currentUser, setCurrentUser, setLoginMessage } = props;

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: details.username,
      password: details.password,
    }),

  };

  try {
    const response = await fetch('/api/login', requestOptions);
    const data = await response.json();
    const { message, user_posts, user_data } = data;
    const { username, fav_users } = user_data;
    // unused var: user_id, liked
    
    console.log('message from login server: ', message);

    if(message === 'user verified') {
      console.log('LOGGED IN SUCCESSFULLY');
      setCurrentUser({ ...currentUser, loggedIn: true, username: username, posts: user_posts, fav_users: fav_users  });
      console.log('response.posts', user_posts);
      setStatus('fulfilled');
      return true;
    }

  } catch(error) {
    console.log('error', JSON.stringify(error));
    setLoginMessage('username / password does not match');
    setStatus('error');
    return false;
  }
};

export default checkLogin;