import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openGlobalModal } from '../../../components/molecules/Global/globalActions';
import { clearMessage } from './projectActions';
import { getPackageJson } from '../../../components/molecules/ProjectPackage/projectPackageActions';
import { loadSnippetDirectory } from '../../../components/molecules/ProjectSnippet/projectSnippetActions';
import Page from '../../../components/layout';
import Tabs from '../../../components/atoms/Tabs';
import ComponentWrapper from '../../../components/atoms/ComponentWrapper';
import ProjectPackage from '../../../components/molecules/ProjectPackage';
import ProjectSnippet from '../../../components/molecules/ProjectSnippet';

const Project = () => {
  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.project);
  const TABS = [
    { title: 'Snippet', component: ComponentWrapper(ProjectSnippet, {}) },
    { title: 'Npm', component: ComponentWrapper(ProjectPackage, { root }) },
  ];

  useEffect(() => {
    dispatch(getPackageJson(root));
    dispatch(loadSnippetDirectory());
  }, [dispatch, root]);

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
