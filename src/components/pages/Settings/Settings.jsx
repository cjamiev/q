import React, { useEffect, useState } from 'react';
import Page from '../../../components/layout';
import useLocalStorage from '../../../hooks/useLocalStorage';
import * as LS_KEYS from '../../../constants/localstorage';
import { copyToClipboard } from '../../../utils/copy';

const Settings = () => {
  const [clipboard, setClipboard] = useLocalStorage(LS_KEYS.LS_CLIPBOARD_KEY, [], true);
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

  const handleCopyLocalStorage = () => {
    const toCopy = Object.values(LS_KEYS).map(key => {
      return { key, value: localStorage.getItem(key) }
    });
    copyToClipboard(JSON.stringify(toCopy));
  };

  return (
    <Page>
      <div style={{ display: 'flex', flexDirection: 'column', width: '200px' }}>
        <label>Add Clipboard Items</label>
        <input type="text" id="description" name="description" placeholder='label' value={description} onChange={handleDescriptionChange}></input>
        <input type="text" id="copy-value" name="copy-value" placeholder='value' value={copyValue} onChange={handleCopyValueChange}></input>
        <button style={{ background: 'black', color: 'white', borderRadius: '20px', cursor: 'pointer' }} onClick={addNewCopyItem}>Add</button>
      </div>
      <div>
        {clipboard.map(c => {
          return (<div key={c.label} style={{ display: 'flex', flexDirection: 'column', width: '200px' }}>
            <span>Label: {c.label} </span>
            <span>Value: {c.value}</span>
            <button style={{ background: 'black', color: 'white', borderRadius: '20px', cursor: 'pointer' }} onClick={() => deleteCopyItem(c.label)}>Remove</button>
          </div>)
        })}
      </div>
      <button onClick={handleCopyLocalStorage}>Copy LocalStorage</button>
    </Page>
  );
};

export default Settings;
