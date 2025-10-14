import React, { useState } from 'react';
import Page from '../../../components/layout';
import { copyToClipboard } from '../../../utils/copy';
import useLocalStorage from '../../../hooks/useLocalStorage';
import { LS_SNIPPETS_KEY } from '../../../constants/localstorage';
import './snippet.css';

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
        <span className='snippet-type'>{snippet.type}</span>
        <button
          className='snippet-load-btn'
          onClick={() => {
            setName(snippet.name);
            setType(snippet.type);
            setContent(snippet.content);
          }}
        >
          {snippet.name}
        </button>
      </React.Fragment>
    );
  });

  return (
    <Page>
      <div className='snippet-wrapper'>
        <div>
          <form>
            <fieldset className='snippet-create-form'>
              <legend> Create </legend>
              <input type="text" id="name" name="name" placeholder="Name" value={name} onChange={handleNameChange}></input>
              <input type="text" id="type" name="type" placeholder="Type" value={type} onChange={handleTypeChange}></input>
              <button
                className='snippet-create-form-btn'
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
          <div className='snippet-load-header'>
            <span className='snippet-load-header-title'>Load</span>
            <button
              onClick={() => {
                copyToClipboard(content);
              }}
            >
              Copy
            </button>
            <button
              onClick={() => {
                setSnippets(snippets.filter(snippet => snippet.name !== name));
              }}
            >
              Delete
            </button>
          </div>
          <div className='snippet-load-btn-wrapper'>{fileButtons}</div>
        </div>
        <div>
          <div className='snippet-text-wrapper'>
            <textarea
              className='snippet-text-area'
              value={content}
              onChange={handleContentChange}
            />
          </div>
        </div>
      </div>
    </Page>
  );
};

export default Snippet;
