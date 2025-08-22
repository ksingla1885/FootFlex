import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const PrivateRoute = ({ element }) => {
  const { userInfo } = useContext(AuthContext);

  return userInfo && !userInfo.isAdmin ? element : <Navigate to="/login/user" />;
};

export default PrivateRoute;