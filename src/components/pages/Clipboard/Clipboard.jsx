import Page from '../../layout';
import { Clips } from './Clips';
import { Timer } from './Timer';
import { Links } from './Links';
import * as ALL_STORAGE from '../../../constants/localstorage';
import { copyToClipboard } from '../../../utils/copy';
import './clipboard.css';

const Clipboard = () => {
  const handleBackup = () => {
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
      <div className='clipboard-sections'>
        <Clips />
        <Timer />
        <Links />
      </div>
      <button className='clipboard-backup-btn' onClick={handleBackup}>Backup</button>
    </Page>
  );
};

export default Clipboard;
