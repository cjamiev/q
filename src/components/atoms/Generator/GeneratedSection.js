import React from 'react';
import { copyToClipboard } from 'utils/copy';
import { SCHeaderWrapper, SCTableHeader, SCRowWrapper, SCTableRow } from './styles';
import { getJSONRow, getJSONData, getCSVData, getSQLInsertData } from './exportHelper';

const ZERO = 0;

const getTableData = (data) => {
  if (!data.length) {
    return { headers: [], rows: [] };
  }

  const headers = data[ZERO].map((i) => i.column);
  const rows = data.map((item) => {
    return item.map((i) => i.value);
  });

  return { headers, rows };
};

export const GeneratedSection = ({ data, deleteRow }) => {
  const { headers, rows } = getTableData(data);

  return (
    <div>
      {data.length ? (
        <div>
          <button
            onClick={() => {
              copyToClipboard(getJSONData(data));
            }}
          >
            Copy as JSON
          </button>
          <button
            onClick={() => {
              copyToClipboard(getCSVData(headers, rows));
            }}
          >
            Copy as CSV
          </button>
          <button
            onClick={() => {
              copyToClipboard(getSQLInsertData(headers, rows));
            }}
          >
            Copy as SQL Insert
          </button>
        </div>
      ) : (
        <span />
      )}
      <div>
        <SCHeaderWrapper>
          {headers.map((item) => {
            return <SCTableHeader key={item}>{item}</SCTableHeader>;
          })}
        </SCHeaderWrapper>
        {rows.map((entry, index) => {
          return (
            <SCRowWrapper key={JSON.stringify(entry)}>
              {entry.map((item) => {
                return <SCTableRow key={item}>{item}</SCTableRow>;
              })}
              <button
                onClick={() => {
                  deleteRow(index);
                }}
              >
                Delete
              </button>
              <button
                onClick={() => {
                  copyToClipboard(getJSONRow(headers, entry));
                }}
              >
                Copy
              </button>
            </SCRowWrapper>
          );
        })}
      </div>
    </div>
  );
};
