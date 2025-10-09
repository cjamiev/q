import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

import Settings from '../pages/Settings';
import ErrorPage from '../pages/ErrorPage';
import Storage from '../pages/Storage';
import Home from '../pages/Home';
import Project from '../pages/Project';
import Experiment from '../pages/Experiment';

const AppRouter = React.memo(() => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={ROUTES.HOME.url} />} />
      <Route path={ROUTES.STORAGE.url} element={<Storage />} />
      <Route path={ROUTES.PROJECT.url} element={<Project />} />
      <Route path={ROUTES.EXPERIMENT.url} element={<Experiment />} />
      <Route path={ROUTES.HOME.url} element={<Home />} />
      <Route path={ROUTES.SETTINGS.url} element={<Settings />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
});

export default AppRouter;
