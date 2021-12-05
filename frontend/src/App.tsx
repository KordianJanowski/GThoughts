import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './views/Home'
import CreateArticle from './views/CreateArticle'
import Article from './views/Article'
import Login from './views/Login'
import Register from './views/Register'
import Dashboard from './views/Dashboard'
import ProfilesUsers from './views/ProfilesUsers'
import Saved from './views/Saved';
import NotFound from './components/NotFound';

const App: React.FC = () =>{
  return (
    <div className='flex justify-center'>
      <Router>
        <div className='flex flex-row bg-main-color'>
          <Switch>
            <Route exact path="/">
              <Navbar />
              <Home />
            </Route>
            <Route path="/create-article">
              <CreateArticle />
            </Route>
            <Route path="/articles/:id">
              <Article />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/dashboard">
              <Navbar />
              <Dashboard />
            </Route>
            <Route path="/profiles-users/:id">
              <Navbar />
              <ProfilesUsers />
            </Route>
            <Route path="/saved">
              <Navbar />
              <Saved />
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;