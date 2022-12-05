import React, { Suspense, createRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import NavBar from './components/Navbar';

import Loader from './components/Loader';

// import React transition group

// import wrapper components for routes for React transition group


const Root = () => {

  return(
    <div className='main'>
      <NavBar />
      <main>
        <Suspense fallback={<Loader />} >
          <Outlet />
        </Suspense>
      </main>

    </div>
  )
};

export default Root;
