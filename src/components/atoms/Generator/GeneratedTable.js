import React from 'react';
import { copyToClipboard } from 'utils/copy';
import {
  SCTable,
  SCHeaderRow,
  SCTableHeaderCell,
  SCTableRow,
  SCTableCell,
  SCTableHeaderActionCell,
  SCTableActionCell
} from './styles';
import { getJSONRow } from './exportHelper';

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

export const GeneratedTable = ({ data, deleteRow }) => {
  const { headers, rows } = getTableData(data);

  if (!data.length) {
    return <div />;
  }

  return (
    <SCTable columncount={headers.length}>
      <thead>
        <SCHeaderRow>
          {headers.map((item) => {
            return <SCTableHeaderCell key={item}>{item}</SCTableHeaderCell>;
          })}
          <SCTableHeaderActionCell>Delete</SCTableHeaderActionCell>
          <SCTableHeaderActionCell>Copy</SCTableHeaderActionCell>
        </SCHeaderRow>
      </thead>
      <tbody>
        {rows.map((entry, index) => {
          return (
            <SCTableRow key={JSON.stringify(entry)}>
              {entry.map((item) => {
                return (
                  <SCTableCell key={item}>
                    <div>{item}</div>
                  </SCTableCell>
                );
              })}
              <SCTableActionCell>
                <button
                  onClick={() => {
                    deleteRow(index);
                  }}
                >
                  D
                </button>
              </SCTableActionCell>
              <SCTableActionCell>
                <button
                  onClick={() => {
                    copyToClipboard(getJSONRow(headers, entry));
                  }}
                >
                  C
                </button>
              </SCTableActionCell>
            </SCTableRow>
          );
        })}
      </tbody>
    </SCTable>
  );
};
