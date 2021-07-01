/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';
import { HOME } from '../../../config/routes';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = useSelector((state) => state.authorization.isAuthenticated);
  return (
    <Route
      {...rest}
      // TODO: Review redirect for non-signed users
      render={(props) => (isAuthenticated ? <Component {...props} /> : <Redirect to={HOME} />)}
    />
  )
};

PrivateRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.element, PropTypes.func]).isRequired,
};

export default PrivateRoute;
