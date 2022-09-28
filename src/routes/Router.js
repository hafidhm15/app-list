import React from 'react';
import Auth from '../views/Auth';
import Task from '../views/Task';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoutes';

const Router = () => {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/task" element={
        <Task />} />
      </Routes>
    </React.Fragment>
  );
};

export default Router;
