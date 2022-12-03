import React, { Suspense, createRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import NavBar from './components/Navbar';

import Loader from './components/Loader';

// import wrapper components

// import Reeact transition group

const Root = () => {

  return(
    <div className='root'>
      
      <Outlet />

    </div>
  )
};

export default Root;
