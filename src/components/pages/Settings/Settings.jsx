import Page from '../../../components/layout';
import { SettingsClipboard } from './SettingsClipboard';
import { SettingsTimer } from './SettingsTimer';
import { copyToClipboard } from '../../../utils/copy';
import * as ALL_STORAGE from '../../../constants/localstorage';

const Settings = () => {

  const handleCopy = () => {
    const allItems = [];
    for (const key of Object.keys(ALL_STORAGE)) {
      allItems.push(ALL_STORAGE[key]);
    }
    const allValues = allItems.map((item) => {
      return { key: item, value: localStorage.getItem(item) };
    })
    copyToClipboard(JSON.stringify(allValues));
  }

  return (
    <Page>
      <div style={{ display: 'flex', gap: '10px', width: '100%', flex: '1 1 auto' }}>
        <SettingsClipboard />
        <SettingsTimer />
      </div>
      <button style={{ position: 'absolute', bottom: '10px', left: '50%', cursor: 'pointer' }} onClick={handleCopy}>COPY</button>
    </Page>
  );
};

export default Settings;
