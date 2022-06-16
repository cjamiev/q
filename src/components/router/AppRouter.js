import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ROUTES } from 'constants/routes';

import Clipboard from 'components/pages/Clipboard';
import Settings from 'components/pages/Settings';
import ErrorPage from 'components/pages/ErrorPage';
import File from 'components/pages/File';
import Home from 'components/pages/Home';
import Project from 'components/pages/Project';

const AppRouter = React.memo(() => {
  return (
    <Routes>
      <Route exact path="/" element={<Navigate to={ROUTES.HOME.url} />} />}
      <Route path={ROUTES.CLIPBOARD.url} element={<Clipboard />} />
      <Route path={ROUTES.FILE.url} element={<File />} />
      <Route path={ROUTES.PROJECT.url} element={<Project />} />
      <Route path={ROUTES.HOME.url} element={<Home />} />
      <Route path={ROUTES.SETTINGS.url} element={<Settings />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
});

export default AppRouter;
