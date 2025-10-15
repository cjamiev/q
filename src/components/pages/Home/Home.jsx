import React, { useState } from 'react';
import useLocalStorage from '../../../hooks/useLocalStorage';
import { copyToClipboard } from '../../../utils/copy';
import { LS_NOTES_KEY } from '../../../constants/localstorage';
import Page from '../../layout';
import * as ALL_STORAGE from '../../../constants/localstorage';
import './home.css';

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
      <div className='home-wrapper'>
        <div className='home-new-note'>
          <textarea
            className='home-new-note-text-area'
            rows={20}
            cols={60}
            value={newNote}
            onChange={({ target: { value } }) => {
              setNewNote(value);
            }}
          />
          <button className='home-new-note-add-btn' onClick={addNewNote}>ADD</button>
        </div>
        <div className='home-notes-wrapper'>
          {notes.map((t, idx) => {
            return (
              <div key={idx} className={`home-note ${expanded === idx ? 'home-note__expanded' : ''}`}>
                <textarea
                  className='home-note-text-area'
                  rows={expanded === idx ? 80 : 20}
                  cols={expanded === idx ? 240 : 60}
                  value={t}
                  onChange={({ target: { value } }) => {
                    handleTextChange(idx, value);
                  }}
                />
                <button className='home-note-remove-btn' onClick={() => deleteNote(idx)}>Remove</button>
                <button className='home-note-expand-btn' onClick={() => handleExpand(idx)}>{idx === expanded ? 'Collapse' : 'Expand'}</button>
                <button className='home-note-copy-btn' onClick={() => handleCopy(t)}>Copy</button>
              </div>
            )
          })}
        </div>
        {showDeleteModal ? <div className='home-delete-modal'>
          <label className='home-delete-modal-title' >Are you sure you want to delete this note?</label>
          <div className='home-delete-modal-btn-wrapper' >
            <button className='home-delete-modal-btn' onClick={confirmDeletion}>Confirm</button>
            <button className='home-delete-modal-btn' onClick={cancelDeletion}>Cancel</button>
          </div>
        </div> : null}
      </div >
      <button className='home-backup-btn' onClick={handleBackup}>Backup</button>
    </Page >
  );
};

export default Home;
