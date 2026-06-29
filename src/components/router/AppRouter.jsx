import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

import Home from '../pages/Clipboard';
import ErrorPage from '../pages/ErrorPage';
import File from '../pages/File';
import Kanban from '../pages/Kanban';
import Experiment from '../pages/Experiment';

const AppRouter = React.memo(() => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={ROUTES.HOME.url} />} />
      <Route path={ROUTES.STORAGE.url} element={<File />} />
      <Route path={ROUTES.KANBAN.url} element={<Kanban />} />
      <Route path={ROUTES.EXPERIMENT.url} element={<Experiment />} />
      <Route path={ROUTES.HOME.url} element={<Home />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
});

export default AppRouter;
