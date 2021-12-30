import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './views/Home'
import SingleHashtag from './views/SingleHashtag'
import CreateArticle from './views/CreateArticle'
import Article from './views/Article'
import Login from './views/Login'
import Register from './views/Register'
import Dashboard from './views/Dashboard'
import ProfilesUsers from './views/ProfilesUsers'
import Saved from './views/Saved';
import Followeds from './views/Followeds';
import NotFound from './views/NotFound';

const App: React.FC = () =>{
  return (
    <div className='flex justify-center items-center'>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/create-article">
            <CreateArticle />
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
          <Route path="/saved">
            <Saved />
          </Route>
          <Route path="/followeds">
            <Followeds />
          </Route>
          <Route path="/articles/:id">
            <Article />
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