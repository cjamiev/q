import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openGlobalModal } from '../../../components/molecules/Global/globalActions';
import { clearMessage } from './projectActions';
import Page from '../../../components/layout';
import Tabs from '../../../components/atoms/Tabs';
import ProjectPackage from '../../../components/molecules/ProjectPackage';
import ProjectSnippet from '../../../components/molecules/ProjectSnippet';

const Project = () => {
  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.project);
  const TABS = [
    { title: 'Snippet', component: ProjectSnippet },
    { title: 'Npm', component: ProjectPackage },
  ];

  useEffect(() => {
    if (message) {
      const parsedResult = message.replace(/\\r/g, '').split('\n');
      const renderResult = parsedResult.map((item, index) => {
        return <p key={index}>{item}</p>;
      });
      dispatch(
        openGlobalModal({
          title: 'Project Response',
          message: renderResult,
          beforeClose: () => {
            dispatch(clearMessage());
          }
        })
      );
    }
  }, [dispatch, message]);

  return (
    <Page>
      <Tabs data={TABS} />
    </Page>
  );
};

export default Project;
