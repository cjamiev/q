import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Page from 'components/layout';
import ComponentWrapper from 'components/atoms/ComponentWrapper';
import { loadProject, updateProject } from 'components/pages/Project/projectActions';
import { SettingsTab } from 'components/molecules/SettingsTab';
import Tabs from 'components/atoms/Tabs';
import { updateSettings } from './settingsActions';
import { commandLabels, linkLabels, copyLabels, directoryLabels } from './data';

const Settings = () => {
  const dispatch = useDispatch();
  const { directories, regexes } = useSelector((state) => state.project);
  const settings = useSelector((state) => state.settings);

  useEffect(() => {
    dispatch(loadProject());
  }, [dispatch]);

  const handleCommandChange = (updatedCommandSettingsuration) => {
    dispatch(updateSettings({ commands: updatedCommandSettingsuration, links: settings.links, copy: settings.copy }));
  };

  const handleLinkChange = (updatedLinkSettingsuration) => {
    dispatch(updateSettings({ commands: settings.commands, links: updatedLinkSettingsuration, copy: settings.copy }));
  };

  const handleCopyChange = (updatedCopySettingsuration) => {
    dispatch(updateSettings({ commands: settings.commands, links: settings.links, copy: updatedCopySettingsuration }));
  };

  const handleDirectoryChange = (updatedDirectories) => {
    dispatch(updateProject({ directories: updatedDirectories, regexes }));
  };

  const TABS = [
    {
      title: 'Commands',
      component: ComponentWrapper(SettingsTab, {
        settingsData: settings.commands,
        labels: commandLabels,
        onChange: handleCommandChange
      })
    },
    {
      title: 'Links',
      component: ComponentWrapper(SettingsTab, {
        settingsData: settings.links,
        labels: linkLabels,
        onChange: handleLinkChange
      })
    },
    {
      title: 'Copy',
      component: ComponentWrapper(SettingsTab, {
        settingsData: settings.copy,
        labels: copyLabels,
        isHidden: true,
        onChange: handleCopyChange
      })
    },
    {
      title: 'Directories',
      component: ComponentWrapper(SettingsTab, {
        settingsData: directories,
        labels: directoryLabels,
        onChange: handleDirectoryChange
      })
    }
  ];

  return (
    <Page>
      <Tabs data={TABS} />
    </Page>
  );
};

export default Settings;
