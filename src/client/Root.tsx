import React, { Suspense, createRef, RefObject, useContext, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import NavBar from './components/NavBar';

import Loader from './components/Loader';

// import React transition group
import { SwitchTransition, CSSTransition } from 'react-transition-group';

// import wrapper components for routes for React transition group
import HomeWrapper from './components/HomeWrapper';
import ExploreChaanWrapper from './components/ExploreChaanWrapper';
import About from './components/About';
// import Login from './components/Login';
const Login = React.lazy(() => import('./components/Login'));
import UserPostsWrapper from './components/UserPostsWrapper';
import Dashboard from './components/Dashboard';

import { MobileContext } from './components/MobileContext';




const routes = [
  { path: '/', name: 'Home', element: <HomeWrapper />, nodeRef: createRef() as RefObject<HTMLElement>},
  { path: '/explore', name: 'Explore', element: <ExploreChaanWrapper />, nodeRef: createRef() as RefObject<HTMLElement>},
  { path: '/about', name: 'About', element: <About />, nodeRef: createRef() as RefObject<HTMLElement>},
  { path: '/login', name: 'Login', element: <Login />, nodeRef: createRef() as RefObject<HTMLElement>},
  { path: '/user', name: 'Dashboard', element: <Dashboard />, nodeRef: createRef() as RefObject<HTMLElement>},
  { path: '/posts/:user_id', name: 'UserPosts', element: <UserPostsWrapper />, nodeRef: createRef() as RefObject<HTMLElement>},
];

const Root = () => {

  const { setIsMobile } = useContext(MobileContext);

  useEffect(() => {

    // check for mobile devices 
    const mobileDevice = /Android|iPhone/i.test(navigator.userAgent);
    if(mobileDevice) {
      console.log('Mobile device detected: ', navigator.userAgent);
      setIsMobile(true);
      // console.log('isMobile: ', isMobile);
    }

    const mobiCheck = /Mobi/i.test(navigator.userAgent);
    console.log('mobiCheck boolean: ', mobiCheck);

  }, []);

  // per info, useRef(null) is the functional component way of creating refs, createRef() was
  // the older class based way of creating refs???


  const location = useLocation();

  const { nodeRef } = routes.find((route) => route.path === location.pathname) ?? {};

  return(
    <div className='root'>
      <NavBar />
      <main>
        <Suspense fallback={<Loader />} >
          <div className="react-transition-container">
            <SwitchTransition>
              <CSSTransition
                key={location.pathname}
                nodeRef={nodeRef}
                timeout={300}
                classNames="fade"
                unmountOnExit
              >
                {/* - nodeRef is casted as RefObject<HTMLElement> at routes array to satisfy original 
                type issue for nodeRef prop of CSSTransition */}
                {/* @ts-ignore  */}
                <div ref={nodeRef} className="fade">
                  <Outlet />
                </div>
              </CSSTransition>
            </SwitchTransition>
          </div>
        </Suspense>
      </main>

    </div>
  );
};

export default Root;
