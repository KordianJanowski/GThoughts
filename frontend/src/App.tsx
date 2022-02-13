import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './views/Home'
import FAQ from './views/FAQ'
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
import { I18nProvider, LOCALES } from './i18n';
import ForgotPassword from './views/ForgotPassword';
import ResetPassword from './views/ResetPassword';
import DetectOffline from './components/DetectOffline';

const App: React.FC = () =>{
  const [locale, setLocale] = useState<any>(localStorage.getItem('i18n') ? localStorage.getItem('i18n') : LOCALES.POLISH);
  
  useEffect(() =>{
    setLocale(localStorage.getItem('i18n') ? localStorage.getItem('i18n') : LOCALES.POLISH)
  }, [locale])

  return (
    <I18nProvider locale={locale}>
      <div className='flex justify-center items-center'>
        <DetectOffline />
        <Router>
          <Switch>
            <Route exact path={["/", "/page/:page"]}>
              <Home />
            </Route>
            <Route path="/faq">
              <FAQ />
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
            <Route path="/forgot-password">
              <ForgotPassword />
            </Route>
            <Route path="/reset-password">
              <ResetPassword />
            </Route>
            <Route path={['/dashboard/page/:page', '/dashboard']}>
              <Dashboard />
            </Route>
            <Route path="/change-user-data">
              <ChangeUserData />
            </Route>
            <Route path={['/profiles-users/:id/page/:page', '/profiles-users/:id']}>
              <ProfilesUsers />
            </Route>
            <Route path="/liked">
              <Liked />
            </Route>
            <Route path="/following">
              <Followeds />
            </Route>
            <Route path={["/hashtags/:hashtag/page/:page", "/hashtags/:hashtag/"]}>
              <SingleHashtag />
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </Router>
      </div>
    </I18nProvider>
  );
}

export default App;