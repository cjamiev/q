import styled from 'styled-components';
import { Theme } from 'theme';

export const SCSettingsWrapper = styled.div`
  display: flex;
  column-gap: 20px;

  ${Theme.getMediaQuery(Theme.S, Theme.M)} {
    flex-direction: column;
  }
`;

export const SCTable = styled.table`
  width: 840px;
`;

export const SCTableHeaderCell = styled.th`
  text-align: center;
`;

export const SCTableCell = styled.td`
  position: relative;
  color: hsl(0, 0%, 70%);
  background-color: ${Theme.primaryBackgroundColor};
  border: none;
  border-bottom: 1px solid hsl(0, 0%, 87%);
  height: 40px;
  width: ${(props) => (props.isIcon ? '40px' : '400px')};
  padding: 0;

  svg {
    position: absolute;
    top: 3px;
  }

  svg:hover {
    transform: scale(1.1);
  }

  ${(props) => props.isClickable && 'cursor: pointer'};

  ${(props) =>
    props.isFirstCell &&
    `::before {
      position: absolute;
      content: '';
      top: 7px;
      height: 25px;
      width: 1px;
      background-color: hsl(0, 0%, 87%);
    }`};

  ::after {
    position: absolute;
    content: '';
    top: 7px;
    left: calc(100% - 2px);
    height: 25px;
    width: 1px;
    background-color: hsl(0, 0%, 87%);
  }
`;

export const SCTableHidden = styled.span`
  display: none;

  ${SCTableCell}:active & {
    display: inline;
  }
`;

export const SCTableOverlayText = styled.span`
  display: inline;
  width: 100%;
  padding-left: 5px;
  cursor: pointer;

  ${SCTableCell}:active & {
    display: none;
  }
`;

export const SCCellValue = styled.span`
  position: absolute;
  top: 10px;
  left: 5px;
  white-space: nowrap;
`;

export const SCCellLongValue = styled.span`
  display: none;
  position: absolute;
  top: 30px;
  right: -50px;
  height: 40px;
  padding: 10px;
  background-color: #ffffff;
  z-index: 1;

  ${SCTableCell}:hover & {
    display: inline;
  }
`;

export const SCCreateFormFieldSet = styled.fieldset`
  width: 350px;
  padding: 10px;
  border-width: 2px;
  border-style: groove;
  border-color: threedface;
  border-image: initial;

  div {
    margin-bottom: 10px;
    margin-left: 6px;
  }

  button {
    margin-left: 12px;
  }
`;
