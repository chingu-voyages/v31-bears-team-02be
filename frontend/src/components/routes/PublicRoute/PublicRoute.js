/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';
import { USER } from '../../../config/routes';
import { useSelector } from 'react-redux';

const PublicRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = useSelector((state) => state.authorization.isAuthenticated);
  const signedInUser = useSelector((state) => state.authorization.signedInUser);
  return (
    <Route
      {...rest}
      // TODO: Review redirect for user on sign in
      render={(props) => (isAuthenticated ? <Redirect to={`${USER}/${signedInUser}`} /> : <Component {...props} />)}
    />
  )
};

PublicRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.element, PropTypes.func]).isRequired,
};

export default PublicRoute;
