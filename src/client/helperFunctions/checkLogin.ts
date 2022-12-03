import { LoggedInUserProp } from "../../types";
import { CheckLoginProps} from '../../types';

const checkLogin =  async (props: CheckLoginProps) => {

  const { details, setStatus, loggedInUser, setLoggedInUser, setLoginMessage } = props;

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
    const { username, user_id, fav_users, liked } = user_data;
    console.log('message from login server: ', message);

    if(message === 'user verified') {
      console.log('LOGGED IN SUCCESSFULLY');
      setLoggedInUser({ ...loggedInUser, loggedIn: true, username: username, posts: user_posts, liked: liked, fav_users: fav_users  });
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