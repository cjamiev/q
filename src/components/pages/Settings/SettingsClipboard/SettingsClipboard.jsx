import { useState } from 'react';
import useLocalStorage from '../../../../hooks/useLocalStorage';
import { LS_CLIPBOARD_KEY } from '../../../../constants/localstorage';


export const SettingsClipboard = () => {
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
      <label>Add Clipboard Items</label>
      <div style={{ display: 'flex', flexDirection: 'column', width: '200px' }}>
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
    </div>
  );
};
