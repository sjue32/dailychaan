import React, { useState, createContext, ReactNode } from 'react';
import { MobileContextValue } from '../../types';

export const MobileContext = createContext<MobileContextValue | undefined>(undefined);

// ReactNode is more generic than ReactElement
export const MobileProvider = (props: { children: ReactNode }) => {

  console.log('navigator.userAgent', navigator.userAgent);
  
  const [isMobile, setIsMobile] = useState<boolean>(false);

  return(
    <MobileContext.Provider value={{isMobile, setIsMobile}}>
      {props.children}
    </MobileContext.Provider>
  )
};