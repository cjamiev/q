import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadDirectory, loadStorage, writeStorage } from './storageActions';
import { dismissAlert } from 'components/layout/Alert/alertActions';
import { FileOperations } from 'components/organisms/FileOperations';
import Page from 'components/layout';
import Text from 'components/atoms/Form/Text';
import TextArea from 'components/atoms/Form/TextArea';
import Button from 'components/atoms/Button';
import { copyToClipboard } from 'utils/copy';
import { SCStorageBtnWrapper, SCStorageNameWrapper } from './styles';
import { SaveSVG } from 'components/atoms/Icons/SaveSVG';
import { CopySVG } from 'components/atoms/Icons/CopySVG';

const Storage = () => {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const dispatch = useDispatch();
  const { directory, storageContent } = useSelector((state) => state.storage);

  useEffect(() => {
    dispatch(loadDirectory());
  }, [dispatch]);

  useEffect(() => {
    if (name) {
      setContent(storageContent);
    }
  }, [name, storageContent]);

  const handleNameChange = ({ selected }) => {
    const selectedStorage = directory.find((item) => item === selected);
    if (selectedStorage) {
      dispatch(loadStorage(selected));
    }
    setName(selected);
  };

  return (
    <Page>
      <div className="flex--horizontal">
        <SCStorageBtnWrapper>
          <SCStorageNameWrapper>
            <Text placeholder="Enter File Name" selected={name} onChange={handleNameChange} />
            <SaveSVG
              transform="scale(0.7) translate(0,-5)"
              width="45"
              onClick={() => {
                if (name && content) {
                  dispatch(writeStorage(name, content));
                }
              }}
            />
            <CopySVG
              ariaLabel="Copy Storage"
              width="45"
              transform={'scale(0.7) translate(0,-5)'}
              onClick={() => {
                copyToClipboard(content);
              }}
            />
          </SCStorageNameWrapper>
          {directory.map((item) => {
            return (
              <Button
                isPrimary
                key={item}
                label={item}
                onClick={() => {
                  setName(item);
                  dispatch(loadStorage(item));
                  dispatch(dismissAlert());
                }}
              />
            );
          })}
        </SCStorageBtnWrapper>
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

export default Storage;
