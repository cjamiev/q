import Page from '../../layout';
import { Clips } from './Clips';
import { Timer } from './Timer';
import { copyToClipboard } from '../../../utils/copy';
import * as ALL_STORAGE from '../../../constants/localstorage';
import './clipboard.css';

const Clipboard = () => {

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
      <div className='clipboard-sections'>
        <Clips />
        <Timer />
      </div>
      <button className='clipboard-btn' onClick={handleCopy}>COPY</button>
    </Page>
  );
};

export default Clipboard;
