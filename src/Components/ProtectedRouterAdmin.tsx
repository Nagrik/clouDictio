import React from 'react';
import { useSelector } from 'react-redux';
import { Route, RouteProps, Redirect } from 'react-router';

import { selectIsLoggedIn, selectIsLoading } from '@/store/selectors/login';

const ProtectedRouterAdmin: React.FC<RouteProps> = (props) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isLoading = useSelector(selectIsLoading);
  if (isLoading) return <></>;
  return (isLoggedIn) ? <Route {...props} /> : <Redirect to="/login" />;
};

export default ProtectedRouterAdmin;
