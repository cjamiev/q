import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openGlobalModal } from '../../../components/molecules/Global/globalActions';
import { loadProject, clearMessage } from './projectActions';
import { getPackageJson } from '../../../components/molecules/ProjectPackage/projectPackageActions';
import { loadSnippetDirectory } from '../../../components/molecules/ProjectSnippet/projectSnippetActions';
import { CopySVG } from '../../../components/atoms/Icons/CopySVG';
import Page from '../../../components/layout';
import Tabs from '../../../components/atoms/Tabs';
import ComponentWrapper from '../../../components/atoms/ComponentWrapper';
import { copyToClipboard } from '../../../utils/copy';
import ProjectPackage from '../../../components/molecules/ProjectPackage';
import ProjectSnippet from '../../../components/molecules/ProjectSnippet';
import useLocalStorage from '../../../hooks/useLocalStorage';
import { SCDirPath, SCDirSidePanelWrapper, SCDirBtnWrapper, SCDirectoryBtn } from './styles';

const DEFAULT_DIR = './';
const LS_DIR_KEY = 'rootDir';

const Project = () => {
  const dispatch = useDispatch();
  const [root, setRoot] = useLocalStorage(LS_DIR_KEY, DEFAULT_DIR, false);
  const { remoteUrl, directories, regexes, message } = useSelector((state) => state.project);
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
