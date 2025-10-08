import Page from '../../../components/layout';
import { SettingsClipboard } from './SettingsClipboard';
import { SettingsNotes } from './SettingsNotes';
import { SettingsTimer } from './SettingsTimer';

const Settings = () => {
  return (
    <Page>
      <SettingsClipboard />
      <SettingsTimer />
      <SettingsNotes />
    </Page>
  );
};

export default Settings;
