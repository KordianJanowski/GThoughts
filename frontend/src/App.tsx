import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './views/Home'
import Article from './views/Article'
import CreateArticle from './views/CreateArticle'
import EditArticle from './views/EditArticle'
import Login from './views/Login'
import Register from './views/Register'
import Dashboard from './views/Dashboard'
import ChangeUserData from './views/ChangeUserData'
import Liked from './views/Liked';
import Followeds from './views/Followeds';
import ProfilesUsers from './views/ProfilesUsers'
import SingleHashtag from './views/SingleHashtag'
import NotFound from './views/NotFound';

const App: React.FC = () =>{
  return (
    <div className='flex justify-center items-center'>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/articles/:id">
            <Article />
          </Route>
          <Route path="/create-article">
            <CreateArticle />
          </Route>
          <Route path="/edit-article/:id">
            <EditArticle />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/change-user-data">
            <ChangeUserData />
          </Route>
          <Route path="/create-article">
            <CreateArticle />
          </Route>
          <Route path="/liked">
            <Liked />
          </Route>
          <Route path="/followeds">
            <Followeds />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/profiles-users/:id">
            <ProfilesUsers />
          </Route>
          <Route path="/hashtags/:hashtag">
            <SingleHashtag />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;