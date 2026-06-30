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
    setClipboard(clipboard.concat({ label: description, value: copyValue, isFavorite: false, position: clipboard.length }));
    setDescription('');
    setCopyValue('');
  }

  const handleFavorite = (id) => {
    setClipboard(clipboard.map(c => {
      if (c.label === id) {
        return {
          ...c,
          isFavorite: !c.isFavorite
        }
      } else {
        return c;
      }
    }));
  }

  const swapPositions = (positionA, positionB) => {
    const updatedClips = clipboard.map((item) => {
      if (item.position === positionA) {
        return {
          ...item,
          position: positionB
        }
      } else if (item.position === positionB) {
        return {
          ...item,
          position: positionA
        }
      }
      return item;
    });
    setClipboard(updatedClips);
  }

  const deleteCopyItem = (d) => {
    const updatedClips = clipboard.filter(c => c.label !== d).map((item, index) => {
      return {
        ...item,
        position: index
      }
    })
    setClipboard(updatedClips);
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
        <input type="text" id="copy-label" name="copy-label" placeholder='label' value={description} onChange={handleDescriptionChange}></input>
        <input type="text" id="copy-value" name="copy-value" placeholder='value' value={copyValue} onChange={handleCopyValueChange}></input>
        <button className='clips-add-btn' onClick={addNewCopyItem}>Add</button>
        <label><input type="checkbox" checked={showEdit} onChange={toggleEdit} /> Edit Mode</label>
      </div>
      <div className='clips-item-wrapper'>
        {clipboard.sort((a, b) => a.position - b.position).map((c, index) => {
          return (<div key={c.label} className='clips-item'>
            <span className='clips-item_label'>{c.label} {c.position}</span>
            {showEdit && <span className='clips-item_value'>{c.value}</span>}
            {showEdit ? <label className='clips-is-favorite'><input type="checkbox" checked={c.isFavorite} onChange={() => handleFavorite(c.label)} /> Is Favorite? </label> : <button className='clips-copy-btn' onClick={() => handleCopyValue(c.value)}>Copy</button>}
            {showEdit ? <div>
              <button className='clips-moveup-btn' disabled={c.position === 0} onClick={() => swapPositions(c.position, clipboard[index - 1].position)}>Up</button>
              <button className='clips-movedown-btn' disabled={c.position === clipboard.length - 1} onClick={() => swapPositions(c.position, clipboard[index + 1].position)}>Down</button>
              <button className='clips-remove-btn' onClick={() => deleteCopyItem(c.label)}>Remove</button>
            </div> : null}
          </div>)
        })}
      </div>
    </div>
  );
};
