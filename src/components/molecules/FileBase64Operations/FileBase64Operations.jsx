import { useEffect, useState } from 'react';
import { copyToClipboard } from '../../../utils/copy';
import { downloadFile } from '../../../utils/download';

const getDecodedText = (encodedText) => {
  try {
    const decoded = window.atob(encodedText);

    return decoded;
  } catch (e) {
    console.error(e);

    return 'Error: Content is not properly encoded';
  }
}

export const FileBase64Operations = ({ content, onChange }) => {
  const [translatedOutput, setTranslatedOutput] = useState('');
  const [isEncoding, setIsEncoding] = useState(true);

  useEffect(() => {
    if (isEncoding) {
      const encoded = window.btoa(content);

      setTranslatedOutput(encoded);
    } else {
      const decoded = getDecodedText(content);

      setTranslatedOutput(decoded);
    }
  }, [content, isEncoding]);

  const onHandleFileInput = async (event) => {
    const file = event.target.files?.[0];

    if (file) {
      const fileSize = Math.floor(file.size / 1024);
      const reader = new FileReader();

      reader.onload = function (e) {
        const content = e.target?.result;
        onChange(String(content));
      };

      reader.onerror = function (e) {
        console.error('Error reading file:', e);
      };

      if (fileSize < 1024) {
        reader.readAsText(file);
      } else {
        onChange('File size too big. Limit to 1MB.');
      }
    }
  };

  const toggleMode = () => {
    setIsEncoding(!isEncoding);
  }

  const onCopy = () => {
    copyToClipboard(translatedOutput);
  };

  const onDownload = () => {
    downloadFile('output.txt', translatedOutput);
  };

  return (
    <div className='file-operation-wrapper'>
      <div>
        <textarea
          className='file-text-area-output'
          placeholder="output"
          onChange={() => { }}
          value={translatedOutput}
        />
        <div>
          <input type="checkbox" checked={isEncoding} onClick={toggleMode} />
          <span onClick={toggleMode}>{isEncoding ? 'Encode' : 'Decode'}</span>
          <button onClick={onCopy}>
            Copy
          </button>
          <button onClick={onDownload}>
            Download
          </button>
        </div>
        <div>
          <input
            type="file"
            id="input-file"
            onChange={(event) => onHandleFileInput(event)}
            accept=".txt,.xml,.json"
          />
        </div>
      </div>
    </div>
  );
};
