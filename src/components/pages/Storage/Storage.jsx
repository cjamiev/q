import { useState } from 'react';
import { FileOperations } from '../../../components/organisms/FileOperations';
import Page from '../../../components/layout';
import { copyToClipboard } from '../../../utils/copy';
import useLocalStorage from '../../../hooks/useLocalStorage';
import { LS_FILES_KEY } from '../../../constants/localstorage';
import './storage.css';

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
      <div className='storage-wrapper'>
        <div className='storage-text-wrapper'>
          <div className='storage-name-wrapper'>
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
              <div className={'storage-btn-wrapper ' + showFileNames ? '' : 'storage-btn-wrapper__visible'}>
                {files.map((item) => {
                  return (
                    <button
                      className='storage-btn'
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
            style={{ width: '800px', height: '750px', border: '1px solid #aaaaaa', padding: '5px' }}
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
          />
        </div>
      </div>
    </Page>
  );
};

export default Storage;
