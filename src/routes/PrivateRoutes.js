import React, { useContext } from 'react';
import { Routes, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/auth';

const PrivateRoute = ({ element: Element, ...rest }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <Routes
      {...rest}
      render={(props) =>
        isAuthenticated ? <Element {...props} /> : <Navigate to="/" />
      }
    />
  );
};

export default PrivateRoute;
