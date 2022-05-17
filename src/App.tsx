import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './global.css';
import LoginPage from '@/Pages/LoginPage';
import AdminPage from '@/Pages/AdminPage';
import ProtectedRouterAdmin from '@/Components/ProtectedRouterAdmin';
import store from '@/store';
import { getUserInfo } from '@/store/actions/user';
import MainPage from '@/Pages/MainPage';

store.dispatch<any>(getUserInfo());
function App() {
  return (
    <Switch>
      <Route path="/login" component={LoginPage} />
      <ProtectedRouterAdmin exact path="/" component={AdminPage} />
      <ProtectedRouterAdmin path="/organization/:companyName/:companyId" component={MainPage} />
    </Switch>
  );
}

export default App;
