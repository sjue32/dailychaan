import React, { useState, createContext, ReactNode } from 'react';
import { CurrentUserProps } from '../../types';

export const CurrentUserContext = createContext(undefined);

// ReactNode is more generic than ReactElement
export const CurrentUserProvider = (props: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<CurrentUserProps>({
    loggedIn: false,
    username: '',
    posts: [],
    fav_users: {},
  });

  return(
    <CurrentUserContext.Provider value={{currentUser, setCurrentUser}}>
      {props.children}
    </CurrentUserContext.Provider>
  )
};




