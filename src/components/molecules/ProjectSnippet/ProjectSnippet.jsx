import React, { useState } from 'react';
import { copyToClipboard } from '../../../utils/copy';
import useLocalStorage from '../../../hooks/useLocalStorage';
import { LS_SNIPPETS_KEY } from '../../../constants/localstorage';
import './project-snippet.css';

const Snippet = () => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [content, setContent] = useState('');
  const [snippets, setSnippets] = useLocalStorage(LS_SNIPPETS_KEY, [], true);

  const handleContentChange = ({ target: { value } }) => {
    setContent(value);
  };

  const handleNameChange = ({ target: { value } }) => {
    setName(value);
  };

  const handleTypeChange = ({ target: { value } }) => {
    setType(value);
  };

  const fileButtons = snippets.sort((a, b) => b.type - a.type).map((snippet) => {
    return (
      <React.Fragment key={snippet.name}>
        <span className='project-snippet-type'>{snippet.type}</span>
        <button
          className='project-snippet-load-btn'
          onClick={() => {
            setContent(snippet.content);
          }}
        >
          {snippet.name}
        </button>
      </React.Fragment>
    );
  });

  return (
    <div className='project-snippet-wrapper'>
      <div>
        <form>
          <fieldset className='project-snippet-create-form'>
            <legend> Create Snippet </legend>
            <input type="text" id="name" name="name" placeholder="Name" value={name} onChange={handleNameChange}></input>
            <input type="text" id="type" name="type" placeholder="Type" value={name} onChange={handleTypeChange}></input>
            <button
              className='project-snippet-create-form-btn'
              onClick={(e) => {
                e.preventDefault();
                if (name && content) {
                  setSnippets(snippets.concat([{ name, type, content }]))
                }
              }}
            >
              Submit
            </button>
          </fieldset>
        </form>
        <div className='project-snippet-load-header'>
          <span className='project-snippet-load-header-title'>Load File</span>
          <button
            onClick={() => {
              copyToClipboard(content);
            }}
          >Copy</button>
          <button
            onClick={() => {
              setSnippets(snippets.filter(snippet => snippet.name !== name));
            }}
          >Delete</button>
        </div>
        <div className='project-snippet-load-btn-wrapper'>{fileButtons}</div>
      </div>
      <div>
        <div className='project-snippet-text-wrapper'>
          <textarea
            className='project-snippet-text-area'
            value={content}
            onChange={handleContentChange}
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default Snippet;
