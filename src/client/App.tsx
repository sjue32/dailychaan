// import React, { useEffect, useState } from 'react';
// import { Routes, Route, useLocation } from 'react-router-dom';
// import { TransitionGroup, CSSTransition } from 'react-transition-group';
// import NavBar from './components/Navbar';
// import Home from './components/Home';
// import Dashboard from './components/Dashboard';
// import Explore from './components/Explore';
// import About from './components/About';
// import Posts from './components/Posts';
// import Login from './components/Login';
// import { ImageFrameProps, UsersData, ImagePostProp, LoggedInUserProp } from '../types';

// const App = () => {

//   const [ usersList, setUsersList ] = useState<Record<string, UsersData>>({});
//   const [ userPosts, setUserPosts ] = useState<Record<string, ImagePostProp[]>>({});
//   // const [ isLoading, setIsLoading ] = useState<boolean>(true);
//   const [ loggedInUser, setLoggedInUser ] = useState<LoggedInUserProp>({
//     loggedIn: false,
//     username: '',
//     posts: [],
//     fav_users: [],
//     liked: {}
//   });

//   const location = useLocation();

//   return (
//     <div className="main">
//       <NavBar loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />
//       {/* <div className="routesContainer">  */}
//         <TransitionGroup className="routesContainer">
//           <CSSTransition key={location.key} classNames="fade" timeout={300}>
//             <Routes location={location}>
//               <Route path="/" element={<Home />} />
//               <Route path="/user" element={<Dashboard loggedInUser={loggedInUser} />} />
//               <Route path="/explore" element ={<Explore  />} />
//               <Route path="/about" element ={<About />} />
//               <Route path ="/posts/:user_id" element ={<Posts user_posts={ userPosts } setUserPosts={setUserPosts} /> } />
//               <Route path="/login" element ={<Login loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />} />
//             </Routes>
//           </CSSTransition>
//         </TransitionGroup>
//       {/* </div> */}
//     </div>
//   );
// }

// export default App;