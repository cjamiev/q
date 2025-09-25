import React, { useState } from 'react';
import { copyToClipboard } from '../../../utils/copy';
import Button from '../../../components/atoms/Button';
import { CopySVG } from '../../../components/atoms/Icons/CopySVG';
import { TrashSVG } from '../../../components/atoms/Icons';
import useLocalStorage from '../../../hooks/useLocalStorage';
import {
  SCFlexWrapper,
  SCCreateFormFieldSet,
  SCLoadHeader,
  SCLoadBtnWrapper,
  SCSnippetType,
  SCLoadButton,
  SCSnippetTextWrapper
} from './styles';
import { LS_SNIPPETS_KEY } from '../../../constants/localstorage';

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
        <SCSnippetType>{snippet.type}</SCSnippetType>
        <SCLoadButton
          label={snippet.name}
          onClick={() => {
            setContent(snippet.content);
          }}
        />
      </React.Fragment>
    );
  });

  return (
    <SCFlexWrapper>
      <div>
        <form>
          <SCCreateFormFieldSet>
            <legend> Create Snippet </legend>
            <input type="text" id="name" name="name" placeholder="Name" value={name} onChange={handleNameChange}></input>
            <input type="text" id="type" name="type" placeholder="Type" value={name} onChange={handleTypeChange}></input>
            <Button
              label="Submit"
              isprimary
              onClick={(e) => {
                e.preventDefault();
                if (name && content) {
                  setSnippets(snippets.concat([{ name, type, content }]))
                }
              }}
            />
          </SCCreateFormFieldSet>
        </form>
        <SCLoadHeader>
          <span>Load File</span>
          <CopySVG
            width="45"
            onClick={() => {
              copyToClipboard(content);
            }}
            transform="translate(0,4)"
          />
          <TrashSVG
            transform="translate(0,4)"
            width="45"
            onClick={() => {
              setSnippets(snippets.filter(snippet => snippet.name !== name));
            }}
          />
        </SCLoadHeader>
        <SCLoadBtnWrapper>{fileButtons}</SCLoadBtnWrapper>
      </div>
      <div>
        <SCSnippetTextWrapper>
          <textarea
            style={{ width: '500px', height: '500px', border: '1px solid #aaaaaa', padding: '5px' }}
            value={content}
            onChange={handleContentChange}
          ></textarea>
        </SCSnippetTextWrapper>
      </div>
    </SCFlexWrapper>
  );
};

export default Snippet;
