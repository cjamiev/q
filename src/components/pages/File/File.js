import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadDirectory, loadFile, writeFile } from './fileActions';
import { dismissAlert } from 'components/layout/Alert/alertActions';
import { FileOperations } from 'components/organisms/FileOperations';
import Page from 'components/layout';
import Text from 'components/atoms/Form/Text';
import TextArea from 'components/atoms/Form/TextArea';
import Button from 'components/atoms/Button';
import { copyToClipboard } from 'utils/copy';
import { SCFileBtnWrapper, SCFileNameWrapper } from './styles';
import { SaveSVG } from 'components/atoms/Icons/SaveSVG';
import { CopySVG } from 'components/atoms/Icons/CopySVG';

const File = () => {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const dispatch = useDispatch();
  const { directory, fileContent } = useSelector((state) => state.file);

  useEffect(() => {
    dispatch(loadDirectory());
  }, [dispatch]);

  useEffect(() => {
    if (name) {
      setContent(fileContent);
    }
  }, [name, fileContent]);

  const handleNameChange = ({ selected }) => {
    const selectedFile = directory.find((item) => item === selected);
    if (selectedFile) {
      dispatch(loadFile(selected));
    }
    setName(selected);
  };

  return (
    <Page>
      <div className="flex--horizontal">
        <SCFileBtnWrapper>
          <SCFileNameWrapper>
            <Text placeholder="Enter File Name" selected={name} onChange={handleNameChange} />
            <SaveSVG
              transform="scale(0.7) translate(0,-5)"
              width="45"
              onClick={() => {
                if (name && content) {
                  dispatch(writeFile(name, content));
                }
              }}
            />
            <CopySVG
              ariaLabel="Copy File"
              width="45"
              transform={'scale(0.7) translate(0,-5)'}
              onClick={() => {
                copyToClipboard(content);
              }}
            />
          </SCFileNameWrapper>
          {directory.map((item) => {
            return (
              <Button
                isPrimary
                key={item}
                label={item}
                onClick={() => {
                  setName(item);
                  dispatch(loadFile(item));
                  dispatch(dismissAlert());
                }}
              />
            );
          })}
        </SCFileBtnWrapper>
        <div className="flex--three">
          <TextArea
            ariaLabel="Content text area"
            selected={content}
            onChange={({ selected }) => {
              setContent(selected);
            }}
          />
        </div>
        <div className="flex--three">
          <FileOperations
            content={content}
            onChange={(updated) => {
              setContent(updated);
            }}
          />
        </div>
      </div>
    </Page>
  );
};

export default File;
