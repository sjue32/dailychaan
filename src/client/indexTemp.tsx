import React from 'react';
import { createRoot } from 'react-dom/client';
// import { BrowserRouter } from 'react-router-dom';
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';

import Error from './components/Error';

import App from './App';
import './style/style.css';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={} >
      <Route errorElement={<Error />} >

        
      </Route>

    </Route>
  )
)

const container = document.getElementById('root')
const root = createRoot(container!);
root.render(

);
