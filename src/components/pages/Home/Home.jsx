import React, { useState } from 'react';
import useLocalStorage from '../../../hooks/useLocalStorage';
import { copyToClipboard } from '../../../utils/copy';
import { LS_NOTES_KEY } from '../../../constants/localstorage';
import Page from '../../layout';

export const Home = () => {
  const [newNote, setNewNote] = useState('');
  const [notes, setNotes] = useLocalStorage(LS_NOTES_KEY, [], true);
  const [expanded, setExpanded] = useState(-1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState(-1);

  const handleTextChange = (id, content) => {
    const updatednotes = notes.map((t, idx) => {
      if (idx === id) {
        return content;
      }
      return t;
    });
    setNotes(updatednotes);
  };

  const addNewNote = () => {
    setNotes(notes.concat(newNote));
    setNewNote('');
  }

  const deleteNote = (idx) => {
    setShowDeleteModal(true);
    setSelectedNote(idx);
  }

  const confirmDeletion = () => {
    setNotes(notes.filter((_, index) => index !== selectedNote));
    setNewNote('');
    setExpanded(-1);
    setSelectedNote(-1);
    setShowDeleteModal(false);
  }

  const cancelDeletion = () => {
    setExpanded(-1);
    setSelectedNote(-1);
    setShowDeleteModal(false);
  }

  const handleCopy = (text) => {
    copyToClipboard(text);
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
    <Page>
      <div style={{ display: 'flex', position: 'relative' }}>
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
        <div style={{ display: 'flex', gap: '20px' }}>
          {notes.map((t, idx) => {
            return (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', width: idx === expanded ? '75vw' : '300px', maxHeight: '90vh', position: idx === expanded ? 'absolute' : 'relative', top: '0', left: '8%' }}>
                <textarea
                  style={{ background: 'hsl(210, 12%, 16%)', color: 'white', borderRadius: '20px 20px 0 0', padding: '10px' }}
                  rows={expanded === idx ? 80 : 20}
                  cols={expanded === idx ? 240 : 60}
                  value={t}
                  onChange={({ target: { value } }) => {
                    handleTextChange(idx, value);
                  }}
                />
                <button style={{ position: 'absolute', bottom: '1px', left: '0', background: 'white', color: 'black', border: 'none', borderRadius: '0 0 0 20px', cursor: 'pointer' }} onClick={() => deleteNote(idx)}>Remove</button>
                <button style={{ background: 'hsl(210, 12%, 16%)', color: 'white', borderRadius: '0 0 20px 20px', cursor: 'pointer' }} onClick={() => handleExpand(idx)}>{idx === expanded ? 'Collapse' : 'Expand'}</button>
                <button style={{ position: 'absolute', bottom: '0px', right: '0', cursor: 'pointer', borderRadius: '0 0 20px 0' }} onClick={() => handleCopy(t)}>Copy</button>
              </div>
            )
          })}
        </div>
        {showDeleteModal ? <div style={{ position: 'absolute', width: '400px', height: '300px', padding: '20px', zIndex: 2, border: '1px solid black', background: 'black', left: '40%' }}>
          <label style={{ fontSize: '24px', color: 'white', textAlign: 'center', width: '100%' }}>Are you sure you want to delete this note?</label>
          <div style={{ position: 'absolute', bottom: '0', left: '10px', display: 'flex', gap: '10px', marginBottom: '10px', placeContent: 'center', width: '100%', justifyContent: 'center' }}>
            <button style={{ fontSize: '24px' }} onClick={confirmDeletion}>Confirm</button>
            <button style={{ fontSize: '24px' }} onClick={cancelDeletion}>Cancel</button>
          </div>
        </div> : null}
      </div >
    </Page >
  );
};

export default Home;
