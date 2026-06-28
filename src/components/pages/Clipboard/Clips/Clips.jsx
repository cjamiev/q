import { useState } from 'react';
import useLocalStorage from '../../../../hooks/useLocalStorage';
import { LS_CLIPBOARD_KEY } from '../../../../constants/localstorage';
import { copyToClipboard } from '../../../../utils/copy';
import './clips.css';


export const Clips = () => {
  const [clipboard, setClipboard] = useLocalStorage(LS_CLIPBOARD_KEY, [], true);
  const [description, setDescription] = useState('');
  const [copyValue, setCopyValue] = useState('');

  const handleDescriptionChange = ({ target: { value } }) => {
    setDescription(value);
  };

  const handleCopyValueChange = ({ target: { value } }) => {
    setCopyValue(value);
  };

  const addNewCopyItem = () => {
    setClipboard(clipboard.concat({ label: description, value: copyValue }));
    setDescription('');
    setCopyValue('');
  }

  const deleteCopyItem = (d) => {
    setClipboard(clipboard.filter(c => c.label !== d));
  }

  return (
    <div>
      <h2>Clipboard</h2>
      <div className='clips-new-item'>
        <input type="text" id="description" name="description" placeholder='label' value={description} onChange={handleDescriptionChange}></input>
        <input type="text" id="copy-value" name="copy-value" placeholder='value' value={copyValue} onChange={handleCopyValueChange}></input>
        <button className='clips-add-btn' onClick={addNewCopyItem}>Add</button>
      </div>
      <div>
        {clipboard.map(c => {
          return (<div key={c.label} className='clips-item'>
            <span className='clips-item_label'>{c.label} </span>
            <span className='clips-item_value'>{c.value}</span>
            <button className='clips-copy-btn' onClick={() => copyToClipboard(c.value)}>Copy</button>
            <button className='clips-remove-btn' onClick={() => deleteCopyItem(c.label)}>Remove</button>
          </div>)
        })}
      </div>
    </div>
  );
};
