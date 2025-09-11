import React, { useEffect, useState } from 'react';
import Page from '../../../components/layout';
import useLocalStorage from '../../../hooks/useLocalStorage';

const LS_CLIPBOARD_KEY = 'q-clipboard';

const Settings = () => {
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
    <Page>
      <div style={{ display: 'flex', flexDirection: 'column', width: '200px' }}>
        <input type="text" id="description" name="description" value={description} onChange={handleDescriptionChange}></input>
        <input type="text" id="copy-value" name="copy-value" value={copyValue} onChange={handleCopyValueChange}></input>
        <button style={{ background: 'black', color: 'white', borderRadius: '20px', cursor: 'pointer' }} onClick={addNewCopyItem}>Add</button>
      </div>
      <div>
        {clipboard.map(c => {
          return (<div key={c.label}>
            <span>Label: {c.label}</span>
            <span>Value: {c.value}</span>
            <button style={{ background: 'black', color: 'white', borderRadius: '20px', cursor: 'pointer' }} onClick={() => deleteCopyItem(c.label)}>Remove</button>
          </div>)
        })}
      </div>
    </Page>
  );
};

export default Settings;
