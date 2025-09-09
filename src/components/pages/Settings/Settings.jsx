import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Page from '../../../components/layout';
import ComponentWrapper from '../../../components/atoms/ComponentWrapper';
import { SettingsTab } from '../../../components/molecules/SettingsTab';
import Tabs from '../../../components/atoms/Tabs';
import { updateSettings } from './settingsActions';
import { commandLabels, copyLabels, } from './data';

const Settings = () => {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);

  const handleCommandChange = (updatedCommandSettingsuration) => {
    dispatch(updateSettings({ commands: updatedCommandSettingsuration, links: settings.links, copy: settings.copy }));
  };

  const handleCopyChange = (updatedCopySettingsuration) => {
    dispatch(updateSettings({ commands: settings.commands, links: settings.links, copy: updatedCopySettingsuration }));
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
      title: 'Copy',
      component: ComponentWrapper(SettingsTab, {
        settingsData: settings.copy,
        labels: copyLabels,
        isHidden: true,
        onChange: handleCopyChange
      })
    },
  ];

  return (
    <Page>
      <Tabs data={TABS} />
    </Page>
  );
};

export default Settings;
