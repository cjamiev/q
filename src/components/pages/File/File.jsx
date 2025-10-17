import { useState } from 'react';
import { FileOperations } from '../../organisms/FileOperations';
import Page from '../../layout';
import { copyToClipboard } from '../../../utils/copy';
import useLocalStorage from '../../../hooks/useLocalStorage';
import { LS_FILES_KEY } from '../../../constants/localstorage';
import './file.css';

const File = () => {
  const [showFileNames, setShowFileNames] = useState(false);
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useLocalStorage(LS_FILES_KEY, [], true);
  const [operation, setOperation] = useState('string');

  const handleNameChange = ({ target: { value } }) => {
    setName(value);
  };

  const handleContentChange = ({ target: { value } }) => {
    setContent(value);
  };

  const handleOperationChange = (op) => {
    setOperation(op);
  }

  return (
    <Page>
      <div className='file-wrapper'>
        <div className='file-text-wrapper'>
          <div className='file-name-wrapper'>
            <input type="text" id="name" name="name" placeholder="Enter File Name" value={name} onChange={handleNameChange}></input>
            <button
              className='file-btn'
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
              className='file-btn'
              onClick={() => {
                copyToClipboard(content);
              }}
            >
              Copy
            </button>
            {files.length > 0 && <div className='file-file-dropdown' onClick={() => setShowFileNames(!showFileNames)}>
              Select Stored File
              <div className={`file-btn-wrapper ${showFileNames ? 'file-btn-wrapper__visible' : ''}`}>
                {files.map((item) => {
                  return (
                    <button
                      className='file-file-btn'
                      key={item.name}
                      onClick={() => {
                        setName(item.name);
                        setContent(item.content);
                      }}
                    >
                      {item.name}
                    </button>
                  );
                })}
              </div>
            </div>}
          </div>
          <textarea
            className='file-text-area'
            value={content}
            onChange={handleContentChange}
          ></textarea>
        </div>
        <div>
          <FileOperations
            content={content}
            onChange={(updated) => {
              setContent(updated);
            }}
            operation={operation}
            onChangeOperation={handleOperationChange}
          />
        </div>
      </div>
    </Page>
  );
};

export default File;
