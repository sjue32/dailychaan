import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';

import { QueryClient, QueryClientProvider} from '@tanstack/react-query';

// core style sheet
import './style/style.css';

// Components
import Root from './Root';
import About from './components/About';
// import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Loader from './components/Loader';
import Error from './components/Error';

// useContext
import { CurrentUserProvider } from './components/CurrentUserContext';
import { MobileProvider } from './components/MobileContext';


// wrapper
import HomeWrapper from './components/HomeWrapper';
import ExploreChaanWrapper from './components/ExploreChaanWrapper';
import UserPostsWrapper from './components/UserPostsWrapper';

// loaders
import publicPostsLoader from './loaders/publicPostsLoader';
import exploreChaanLoader from './loaders/exploreChaanLoader';
import userPostsLoader from './loaders/userPostsLoader';

// instantiate queryClient
const queryClient = new QueryClient();

// dynamic import of components
const Login = React.lazy(() => import(/* webpackChunkName: "Login" */'./components/Login'));


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={
      <QueryClientProvider client={queryClient} >
        <CurrentUserProvider>
          <MobileProvider>
            <Root />
          </MobileProvider>
        </CurrentUserProvider>
      </QueryClientProvider>
    }>
      <Route errorElement={<Error />} >
        <Route index loader={publicPostsLoader(queryClient)} element={<HomeWrapper />} />
        <Route path="/explore" loader={exploreChaanLoader(queryClient)} element={<ExploreChaanWrapper />} />
        <Route path="/about" element={<About />} />
        <Route path="/user" element={<Dashboard />} />
        <Route path="/posts/:user_id" loader={userPostsLoader(queryClient)} element={<UserPostsWrapper />} />
        <Route path="/login" element={<Suspense fallback={<Loader />} > <Login /> </Suspense>} />
      </Route>
    </Route>
  )
);

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <RouterProvider router={router} />
);
