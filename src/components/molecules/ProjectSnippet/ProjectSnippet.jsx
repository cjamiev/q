import React, { useState } from 'react';
import { copyToClipboard } from '../../../utils/copy';
import Button from '../../../components/atoms/Button';
import Text from '../../../components/atoms/Form/Text';
import TextArea from '../../../components/atoms/Form/TextArea';
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
            <Text
              placeholder="Name"
              selected={name}
              onChange={({ selected }) => {
                setName(selected);
              }}
            />
            <Text
              placeholder="Type"
              selected={type}
              onChange={({ selected }) => {
                setType(selected);
              }}
            />
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
          <TextArea
            ariaLabel="Enter Content"
            selected={content}
            onChange={({ selected }) => {
              setContent(selected);
            }}
          />
        </SCSnippetTextWrapper>
      </div>
    </SCFlexWrapper>
  );
};

export default Snippet;
