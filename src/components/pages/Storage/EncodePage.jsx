import { useEffect, useState } from 'react';
import { copyToClipboard } from '../../../utils/copy';
import { downloadFile } from '../../../utils/download';
import Page from '../../layout';


const getDecodedText = (encodedText) => {
  try {
    const decoded = window.atob(encodedText);

    return decoded;
  } catch (e) {
    console.error(e);

    return 'Error: Content is not properly encoded';
  }
}

const EncodePage = () => {
  const [originalInput, setOriginalInput] = useState('');
  const [translatedOutput, setTranslatedOutput] = useState('');
  const [isEncoding, setIsEncoding] = useState(true);

  useEffect(() => {
    if (isEncoding) {
      const encoded = window.btoa(originalInput);

      setTranslatedOutput(encoded);
    } else {
      const decoded = getDecodedText(originalInput);

      setTranslatedOutput(decoded);
    }
  }, [originalInput, isEncoding]);

  const onHandleInputChange = (event) => {
    setOriginalInput(event.target.value);
  };

  const onHandleFileInput = async (event) => {
    const file = event.target.files?.[0];

    if (file) {
      const fileSize = Math.floor(file.size / 1024);
      const reader = new FileReader();

      reader.onload = function (e) {
        const content = e.target?.result;
        setOriginalInput(String(content));
      };

      reader.onerror = function (e) {
        console.error('Error reading file:', e);
      };

      if (fileSize < 1024) {
        reader.readAsText(file);
      } else {
        setOriginalInput('File size too big. Limit to 1MB.');
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
    <Page>
      <h1 className="pb-4 text-6xl">Encode Data</h1>
      <span>Convert content to base 64 or decode from base 64</span>
      <div className="flex flex-row gap-4">
        <div className="flex w-1/3 flex-col">
          <textarea
            className="h-96 w-full rounded border-2 border-sky-700 p-4"
            onChange={(event) => {
              onHandleInputChange(event);
            }}
            placeholder="input"
            value={originalInput}
          />
          <div>
            <div className='mt-4'>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer" onClick={toggleMode} />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-sky-500"></div>
                <span className="ml-3 text-sm font-medium text-gray-900">{isEncoding ? 'Encode' : 'Decode'}</span>
              </label>
            </div>
            <div className="mt-4">
              <label htmlFor="input-file">Add A file: </label>
              <input
                type="file"
                id="input-file"
                onChange={(event) => onHandleFileInput(event)}
                accept=".txt,.xml,.json"
              />
            </div>
          </div>
        </div>
        <div className="flex w-1/3 flex-col">
          <textarea
            className="h-96 w-full rounded border-2 border-sky-700 p-4"
            placeholder="output"
            onChange={() => { }}
            value={translatedOutput}
          />
          <div>
            <button className="mr-4 mt-4 shadow-md" onClick={onCopy}>
              Copy
            </button>
            <button className="mt-4 shadow-md" onClick={onDownload}>
              Download
            </button>
          </div>
        </div>
      </div>
    </Page>
  );
};

export { EncodePage };
