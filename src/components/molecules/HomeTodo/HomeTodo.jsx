import React, { useState } from 'react';
import useLocalStorage from '../../../hooks/useLocalStorage';
import { copyToClipboard } from '../../../utils/copy';
import { LS_NOTES_KEY } from '../../../constants/localstorage';

export const HomeTodo = () => {
  const [newNote, setNewNote] = useState('');
  const [notes, setNotes] = useLocalStorage(LS_NOTES_KEY, [], true);
  const [expanded, setExpanded] = useState(-1);

  const handleTextChange = (id, content) => {
    const updatednotes = notes.map((t, idx) => {
      if (idx === id) {
        return content;
      }
      return t;
    }).filter(Boolean);
    setNotes(updatednotes);
  };

  const addNewNote = () => {
    setNotes(notes.concat(newNote));
    setNewNote('');
  }

  const handleCopy = () => {
    copyToClipboard(notes.join('\n\n'));
  }

  const handleExpand = (idx) => {
    if (expanded !== idx) {
      setExpanded(idx);
    }
    else {
      setExpanded(-1);
    }
  }

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <div style={{ display: 'flex', flexDirection: 'column', width: '300px', marginRight: '30px' }}>
          <textarea
            style={{ background: 'black', color: 'white', borderRadius: '20px 20px 0 0', padding: '10px' }}
            rows={20}
            cols={60}
            value={newNote}
            onChange={({ target: { value } }) => {
              setNewNote(value);
            }}
          />
          <button style={{ background: 'black', color: 'white', borderRadius: '0 0 20px 20px', cursor: 'pointer' }} onClick={addNewNote}>ADD</button>
        </div>
        <div style={{ display: 'flex', gap: '5px' }}>
          {notes.map((t, idx) => {
            return (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', width: idx === expanded ? '75vw' : '300px', maxHeight: '90vh', position: idx === expanded ? 'absolute' : 'initial', top: '5%', left: '12%' }}>
                <textarea
                  style={{ background: 'black', color: 'white', borderRadius: '20px 20px 0 0', padding: '10px' }}
                  rows={expanded === idx ? 80 : 20}
                  cols={expanded === idx ? 240 : 60}
                  value={t}
                  onChange={({ target: { value } }) => {
                    handleTextChange(idx, value);
                  }}
                />
                <button style={{ background: 'black', color: 'white', borderRadius: '0 0 20px 20px', cursor: 'pointer' }} onClick={() => handleExpand(idx)}>{idx === expanded ? 'Collapse' : 'Expand'}</button>
              </div>
            )
          })}
        </div>
      </div >
      <button style={{ position: 'absolute', bottom: '10px', cursor: 'pointer' }} onClick={handleCopy}>COPY</button>
    </div >
  );
};
