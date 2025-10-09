import Page from '../../../components/layout';
import { SettingsClipboard } from './SettingsClipboard';
import { SettingsTimer } from './SettingsTimer';

const Settings = () => {
  return (
    <Page>
      <SettingsClipboard />
      <SettingsTimer />
    </Page>
  );
};

export default Settings;
