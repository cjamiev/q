import React from 'react';
import { SCTableHeaderCell } from './styles';

const Table = ({ headers, body, isFlex = true }) => {
  const renderHeaders = headers.map((item) => {
    return (
      <SCTableHeaderCell key={item.label} className={item.className}>
        {item.label}
      </SCTableHeaderCell>
    );
  });

  return (
    <table>
      <thead>
        <tr>{renderHeaders}</tr>
      </thead>
      <tbody>{body}</tbody>
    </table>
  );
};

export default Table;
