import React from 'react';
import { createRoot } from 'react-dom/client';
// import { BrowserRouter } from 'react-router-dom';
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';

import { QueryClient, QueryClientProvider} from '@tanstack/react-query';

// style sheet
import './style/style.css';

// Components
// import App from './App';
import Root from './Root';
import HomeWrapper from './components/HomeWrapper';
import ExploreChaanWrapper from './components/ExploreChaanWrapper';
import Error from './components/Error';

// loaders
import publicPostsLoader from './loaders/publicPostsLoader';
import exploreChaanLoader from './loaders/exploreChaanLoader';

// instantiate queryClient
const queryClient = new QueryClient();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={
      <QueryClientProvider client={queryClient} >
        <Root />
      </QueryClientProvider>
      } 
    
    >
      <Route errorElement={<Error />} >
        {/* route index for HomeWrapper */}
        <Route index loader={publicPostsLoader(queryClient)} element={<HomeWrapper />} />
        {/* route explore for ExploreWrapper */}
        <Route path="/explore" loader={exploreChaanLoader(queryClient)} element={<ExploreChaanWrapper />} />
        {/* route for /about and About */}
        {/* route for /user and Dashboard */}
        {/* route for /posts/:user_id */}


      </Route>

    </Route>
  )
)

const container = document.getElementById('root')
const root = createRoot(container!);
root.render(
  <RouterProvider router={router} />
);
