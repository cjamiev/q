import { useState } from 'react';
import { FileOperations } from '../../../components/organisms/FileOperations';
import Page from '../../../components/layout';
import Text from '../../../components/atoms/Form/Text';
import TextArea from '../../../components/atoms/Form/TextArea';
import Button from '../../../components/atoms/Button';
import { copyToClipboard } from '../../../utils/copy';
import {
  SCStorageDropdown,
  SCStorageWrapper,
  SCStorageBtnWrapper,
  SCStorageNameWrapper,
  SCStorageTextWrapper,
  SCStorageOpWrapper
} from './styles';
import { SaveSVG } from '../../../components/atoms/Icons/SaveSVG';
import { CopySVG } from '../../../components/atoms/Icons/CopySVG';
import useLocalStorage from '../../../hooks/useLocalStorage';
import { LS_FILES_KEY } from '../../../constants/localstorage';

const Storage = () => {
  const [showFileNames, setShowFileNames] = useState(false);
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useLocalStorage(LS_FILES_KEY, [], true);

  const handleNameChange = ({ selected }) => {
    setName(selected);
  };

  return (
    <Page>
      <SCStorageWrapper>
        <SCStorageTextWrapper>
          <SCStorageNameWrapper>
            <Text placeholder="Enter File Name" selected={name} onChange={handleNameChange} />
            <SaveSVG
              transform="scale(0.7) translate(0,-5)"
              width="45"
              onClick={() => {
                if (name && content) {
                  setFiles(files.concat([{ name, content }]));
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
            <SCStorageDropdown onClick={() => setShowFileNames(!showFileNames)}>
              Show File Names
              <SCStorageBtnWrapper isvisible={showFileNames}>
                {files.map((item) => {
                  return (
                    <Button
                      isprimary
                      key={item.name}
                      label={item.name}
                      onClick={() => {
                        setName(item.name);
                        setContent(item.content);
                      }}
                    />
                  );
                })}
              </SCStorageBtnWrapper>
            </SCStorageDropdown>
          </SCStorageNameWrapper>
          <TextArea
            ariaLabel="Content text area"
            selected={content}
            onChange={({ selected }) => {
              setContent(selected);
            }}
          />
        </SCStorageTextWrapper>
        <SCStorageOpWrapper>
          <FileOperations
            content={content}
            onChange={(updated) => {
              setContent(updated);
            }}
          />
        </SCStorageOpWrapper>
      </SCStorageWrapper>
    </Page>
  );
};

export default Storage;
