import styled from 'styled-components';

const CELL_LENGTH = 200;
const ACTION_CELL_LENGTH = 120;

export const SCNewFieldSection = styled.div`
  display: flex;
`;

export const SCAddedFieldsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SCNewFieldBtnWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SCTable = styled.table`
  max-width: ${({ columncount }) => ACTION_CELL_LENGTH + CELL_LENGTH * columncount}px;
  overflow-y: auto;
`;

export const SCHeaderRow = styled.tr`
  display: flex;
`;

export const SCTableHeaderCell = styled.th`
  padding: 5px;
  border: 1px solid black;
  width: 200px;
`;

export const SCTableHeaderActionCell = styled.th`
  padding: 5px;
  border: 1px solid black;
  width: 60px;
`;

export const SCTableRow = styled.tr`
  display: flex;
`;

export const SCTableCell = styled.td`
  padding: 5px;
  border: 1px solid black;
  width: 200px;
  div {
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const SCTableActionCell = styled.td`
  padding: 5px;
  border: 1px solid black;
  width: 60px;
`;
