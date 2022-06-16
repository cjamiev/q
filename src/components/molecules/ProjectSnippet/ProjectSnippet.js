import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadSnippetDirectory, loadSnippet, createSnippet, deleteSnippet } from './projectSnippetActions';
import { copyToClipboard } from 'utils/copy';
import Button from 'components/atoms/Button';
import Text from 'components/atoms/Form/Text';
import TextArea from 'components/atoms/Form/TextArea';
import { CopySVG } from 'components/atoms/Icons/CopySVG';
import { TrashSVG } from 'components/atoms/Icons';
import {
  SCFlexWrapper,
  SCCreateFormFieldSet,
  SCLoadHeader,
  SCLoadBtnWrapper,
  SCLoadButton,
  SCButtonGroup,
  SCSnippetTextWrapper
} from './styles';

const Snippet = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const { snippets, snippetFile } = useSelector((state) => state.project);

  useEffect(() => {
    setContent(snippetFile.content);
    setName(snippetFile.name);
  }, [snippetFile]);

  const fileButtons = snippets.map((label) => {
    return (
      <SCLoadButton
        key={label}
        label={label}
        onClick={() => {
          dispatch(loadSnippet(label));
        }}
      />
    );
  });

  return (
    <SCFlexWrapper>
      <div>
        <form>
          <SCCreateFormFieldSet>
            <legend> Create Snippet </legend>
            <Text
              placeholder="Snippet Name"
              selected={name}
              onChange={({ selected }) => {
                setName(selected);
              }}
            />
            <Button
              label="Submit"
              isPrimary
              onClick={(e) => {
                e.preventDefault();
                if (name && content) {
                  dispatch(createSnippet(name, content));
                }
              }}
            />
          </SCCreateFormFieldSet>
        </form>
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
      <div>
        <SCLoadHeader>
          <h2>Load File</h2>
          <CopySVG
            width="45"
            onClick={() => {
              copyToClipboard(snippetFile.content);
            }}
            transform="translate(0,4)"
          />
          <TrashSVG
            transform="translate(0,4)"
            width="45"
            onClick={() => {
              dispatch(deleteSnippet(snippetFile.name));
            }}
          />
        </SCLoadHeader>
        <SCLoadBtnWrapper>{fileButtons}</SCLoadBtnWrapper>
      </div>
    </SCFlexWrapper>
  );
};

export default Snippet;
