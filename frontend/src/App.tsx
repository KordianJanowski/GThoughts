import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './views/Home'
import CreateArticle from './views/CreateArticle'
import Article from './views/Article'
import Login from './views/Login'
import Register from './views/Register'
import Dashboard from './views/Dashboard'
import Saved from './views/Saved';
import NotFound from './components/NotFound';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/">
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
          <Dashboard />
        </Route>
        <Route path="/saved">
          <Saved />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;