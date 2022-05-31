import React from 'react';
import { useSelector } from 'react-redux';
import { Route, RouteProps, Redirect } from 'react-router';

import { selectIsLoggedIn, selectIsLoading } from '@/store/selectors/login';
import Loader from '@/Components/Loader';

const ProtectedRoute: React.FC<RouteProps> = (props) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isLoading = useSelector(selectIsLoading);
  if (isLoading) return <Loader />;
  return (isLoggedIn) ? <Route {...props} /> : <Redirect to="/login" />;
};

export default ProtectedRoute;
