import { useState } from 'react';
import useLocalStorage from '../../../../hooks/useLocalStorage';
import { LS_CLIPBOARD_KEY } from '../../../../constants/localstorage';
import { copyToClipboard } from '../../../../utils/copy';
import './clips.css';


export const Clips = () => {
  const [clipboard, setClipboard] = useLocalStorage(LS_CLIPBOARD_KEY, [], true);
  const [description, setDescription] = useState('');
  const [copyValue, setCopyValue] = useState('');
  const [showEdit, setShowEdit] = useState(false);
  const [showCopySuccess, setShowCopySuccess] = useState(false);

  const handleDescriptionChange = ({ target: { value } }) => {
    setDescription(value);
  };

  const handleCopyValueChange = ({ target: { value } }) => {
    setCopyValue(value);
  };

  const addNewCopyItem = () => {
    setClipboard(clipboard.concat({ label: description, value: copyValue, id: clipboard.length + 1 }));
    setDescription('');
    setCopyValue('');
  }

  const moveUp = (id) => {
    const updatedClips = clipboard.map((item) => {
      if (item.id === id - 1) {
        return {
          ...item,
          id
        }
      } else if (item.id === id) {
        return {
          ...item,
          id: id - 1
        }
      }
      return item;
    });
    setClipboard(updatedClips);
  }

  const moveDown = (id) => {
    const updatedClips = clipboard.map((item) => {
      if (item.id === id + 1) {
        return {
          ...item,
          id
        }
      } else if (item.id === id) {
        return {
          ...item,
          id: id + 1
        }
      }
      return item;
    });
    setClipboard(updatedClips);
  }

  const deleteCopyItem = (d) => {
    setClipboard(clipboard.filter(c => c.label !== d));
  }

  const toggleEdit = () => {
    setShowEdit(!showEdit);
  }

  const handleCopyValue = (value) => {
    copyToClipboard(value);
    setShowCopySuccess(true);
    setTimeout(() => {
      setShowCopySuccess(false)
    }, 1500);
  }

  return (
    <div>
      <h2>Clipboard</h2>
      {showCopySuccess && <div className='clips-success-msg'>Successfully Copied!</div>}
      <div className='clips-new-item'>
        <input type="text" id="description" name="description" placeholder='label' value={description} onChange={handleDescriptionChange}></input>
        <input type="text" id="copy-value" name="copy-value" placeholder='value' value={copyValue} onChange={handleCopyValueChange}></input>
        <button className='clips-add-btn' onClick={addNewCopyItem}>Add</button>
        <label><input type="checkbox" checked={showEdit} onClick={toggleEdit} /> Edit Mode</label>
      </div>
      <div>
        {clipboard.sort((a, b) => a.id - b.id).map(c => {
          return (<div key={c.label} className='clips-item'>
            <span className='clips-item_label'>{c.label} </span>
            <span className='clips-item_value'>{c.value}</span>
            <button className='clips-copy-btn' onClick={() => handleCopyValue(c.value)}>Copy</button>
            {showEdit ? <div>
              <button className='clips-moveup-btn' disabled={c.id === 1} onClick={() => moveUp(c.id)}>Up</button>
              <button className='clips-movedown-btn' disabled={c.id === clipboard.length} onClick={() => moveDown(c.id)}>Down</button>
              <button className='clips-remove-btn' onClick={() => deleteCopyItem(c.label)}>Remove</button>
            </div> : null}
          </div>)
        })}
      </div>
    </div>
  );
};
