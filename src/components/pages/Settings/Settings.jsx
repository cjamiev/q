import Page from '../../../components/layout';
import { SettingsClipboard } from './SettingsClipboard';
import { SettingsTimer } from './SettingsTimer';
import { copyToClipboard } from '../../../utils/copy';
import * as ALL_STORAGE from '../../../constants/localstorage';
import './settings.css';

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
      <div className='settings-sections'>
        <SettingsClipboard />
        <SettingsTimer />
      </div>
      <button className='settings-btn' onClick={handleCopy}>COPY</button>
    </Page>
  );
};

export default Settings;
