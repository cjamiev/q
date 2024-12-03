import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadSnippet, createSnippet, deleteSnippet } from './projectSnippetActions';
import { copyToClipboard } from 'utils/copy';
import Button from 'components/atoms/Button';
import Text from 'components/atoms/Form/Text';
import TextArea from 'components/atoms/Form/TextArea';
import { CopySVG } from 'components/atoms/Icons/CopySVG';
import { TrashSVG } from 'components/atoms/Icons';
import { unique } from 'utils/arrayHelper';
import {
  SCFlexWrapper,
  SCCreateFormFieldSet,
  SCLoadHeader,
  SCLoadBtnWrapper,
  SCSnippetType,
  SCLoadButton,
  SCSnippetTextWrapper
} from './styles';

const TYPE_POSITION = 0;
const NAME_POSITION = 1;

const mapSnippets = (snippets) => {
  const snippetsWithNameAndType = snippets.map((label) => {
    const nameAndType = label.split('__');

    return { name: nameAndType[NAME_POSITION], type: nameAndType[TYPE_POSITION], filename: label };
  });

  const types = unique(snippetsWithNameAndType.map((item) => item.type));

  return types.map((type) => {
    return snippetsWithNameAndType.filter((item) => item.type === type);
  });
};

const Snippet = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [content, setContent] = useState('');
  const { snippets, snippetFile } = useSelector((state) => state.project);

  useEffect(() => {
    if (snippetFile.name) {
      const nameAndType = snippetFile.name.split('__');
      setContent(snippetFile.content);
      setType(nameAndType[TYPE_POSITION]);
      setName(nameAndType[NAME_POSITION]);
    }
  }, [snippetFile]);

  const fileButtons = mapSnippets(snippets).map((sections) => {
    return sections.map((item, index) => {
      return (
        <React.Fragment key={item.filename}>
          {index === TYPE_POSITION && <SCSnippetType>{item.type}</SCSnippetType>}
          <SCLoadButton
            label={item.name}
            onClick={() => {
              dispatch(loadSnippet(item.filename));
            }}
          />
        </React.Fragment>
      );
    });
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
                  const filename = `${type}__${name}`;
                  dispatch(createSnippet(filename, content));
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
