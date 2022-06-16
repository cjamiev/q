import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openGlobalModal } from 'components/molecules/Global/globalActions';
import { loadProject, clearMessage } from './projectActions';
import { getPackageJson } from 'components/molecules/ProjectPackage/projectPackageActions';
import { getRemoteUrl, viewBranches, viewStash } from 'components/molecules/ProjectGit/projectGitActions';
import { loadSnippetDirectory } from 'components/molecules/ProjectSnippet/projectSnippetActions';
import { CopySVG } from 'components/atoms/Icons/CopySVG';
import Page from 'components/layout';
import Tabs from 'components/atoms/Tabs';
import ComponentWrapper from 'components/atoms/ComponentWrapper';
import { copyToClipboard } from 'utils/copy';
import ProjectGit from 'components/molecules/ProjectGit';
import ProjectPackage from 'components/molecules/ProjectPackage';
import ProjectRegex from 'components/molecules/ProjectRegex';
import ProjectSnippet from 'components/molecules/ProjectSnippet';
import useLocalStorage from 'hooks/useLocalStorage';
import { SCDirPath, SCDirSidePanelWrapper, SCDirBtnWrapper, SCDirectoryBtn } from './styles';

const DEFAULT_DIR = './';
const LS_DIR_KEY = 'rootDir';

const Project = () => {
  const dispatch = useDispatch();
  const [root, setRoot] = useLocalStorage(LS_DIR_KEY, DEFAULT_DIR, false);
  const { remoteUrl, directories, regexes, packageJson, message } = useSelector((state) => state.project);
  const TABS = [
    { title: 'Git', component: ComponentWrapper(ProjectGit, { root }) },
    { title: 'Npm', component: ComponentWrapper(ProjectPackage, { root }) },
    { title: 'Regex', component: ComponentWrapper(ProjectRegex, { root, directories, regexes }) },
    { title: 'Snippet', component: ComponentWrapper(ProjectSnippet, {}) }
  ];

  useEffect(() => {
    dispatch(loadProject());
    dispatch(getRemoteUrl(root));
    dispatch(viewBranches(root));
    dispatch(viewStash(root));
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
    <Page
      sidePanelContent={
        <SCDirSidePanelWrapper>
          <h3>Select Project</h3>
          <SCDirPath>
            <div>
              <span>{remoteUrl}</span>
              <CopySVG
                ariaLabel="Copy Git Remote Url"
                width="45"
                onClick={() => {
                  copyToClipboard(remoteUrl);
                }}
              />
            </div>
            <div>
              <span>{root}</span>
              <CopySVG
                ariaLabel="Copy Directory Path"
                width="45"
                onClick={() => {
                  copyToClipboard(root);
                }}
              />
            </div>
          </SCDirPath>
          <SCDirBtnWrapper>
            {directories.map((item) => {
              return (
                <SCDirectoryBtn
                  key={item.label}
                  label={item.label}
                  onClick={() => {
                    setRoot(item.value);
                  }}
                />
              );
            })}
          </SCDirBtnWrapper>
        </SCDirSidePanelWrapper>
      }
    >
      <Tabs data={TABS} />
    </Page>
  );
};

export default Project;
