import { useState } from 'react';
import { FileOperations } from '../../../components/organisms/FileOperations';
import Page from '../../../components/layout';
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

  const handleNameChange = ({ target: { value } }) => {
    setName(value);
  };

  const handleContentChange = ({ target: { value } }) => {
    setContent(value);
  };

  return (
    <Page>
      <SCStorageWrapper>
        <SCStorageTextWrapper>
          <SCStorageNameWrapper>
            <input type="text" id="name" name="name" placeholder="Enter File Name" value={name} onChange={handleNameChange}></input>
            <button
              onClick={() => {
                if (name && content) {
                  const isExistingFile = files.some(f => f.name === name);
                  const updatedFiles = isExistingFile ? files.map(f => {
                    if (f.name === name) {
                      return {
                        name,
                        content
                      };
                    }
                    return f;
                  }) : files.concat([{ name, content }]);

                  setFiles(updatedFiles);
                }
              }}
            >
              Save
            </button>
            <button
              onClick={() => {
                copyToClipboard(content);
              }}
            >
              Copy
            </button>
            {files.length > 0 && <div style={{ position: 'relative', border: '1px solid black' }} onClick={() => setShowFileNames(!showFileNames)}>
              Select Stored File
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
            </div>}
          </SCStorageNameWrapper>
          <textarea
            style={{ width: '800px', height: '750px', border: '1px solid #aaaaaa', padding: '5px' }}
            value={content}
            onChange={handleContentChange}
          ></textarea>
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
