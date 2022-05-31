import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './global.css';
import LoginPage from '@/Pages/LoginPage';
import AdminPage from '@/Pages/AdminPage';
import store from '@/store';
import { getUserInfo } from '@/store/actions/user';
import DeveloperPage from '@/Pages/DeveloperPage';
import OTP from '@/Pages/OTP';
import { Redirect } from 'react-router';
import { useSelector } from 'react-redux';
import { selectUserInfo } from '@/store/selectors/user';
import ProjectPage from '@/Pages/ProjectPage';
import EmailSent from '@/Components/EmailSent';
import ProtectedRoute from '@/Components/ProtectedRoute';

store.dispatch<any>(getUserInfo());

function App() {
  const user = useSelector(selectUserInfo);
  return (
    user?.role === 'customer' ? (
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/login-sent" component={EmailSent} />
        <Route path="/project/:companyName/:companyId" component={ProjectPage} />
        <Route path="/developer/:companyId/:developerId" component={DeveloperPage} />
        <Route exact path="/" component={AdminPage} />
        {/* <Redirect to="/" /> */}
      </Switch>
    ) : (
      <Switch>
        <Route path="/opt/:code/:email" component={OTP} />
        <Route path="/login-sent" component={EmailSent} />
        <Route path="/login" component={LoginPage} />
        <ProtectedRoute path="/project/:companyName/:companyId" component={ProjectPage} />
        <ProtectedRoute path="/developer/:companyId/:developerId" component={DeveloperPage} />
        <ProtectedRoute exact path="/" component={AdminPage} />
      </Switch>
    )

  );
}

export default App;
