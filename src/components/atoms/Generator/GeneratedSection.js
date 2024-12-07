import React from 'react';
import { copyToClipboard } from 'utils/copy';
import { getJSONData, getCSVData, getSQLInsertData } from './exportHelper';
import { GeneratedTable } from './GeneratedTable';

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

  if (!data.length) {
    return <div />;
  }

  return (
    <div>
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
      <GeneratedTable data={data} deleteRow={deleteRow} />
    </div>
  );
};
