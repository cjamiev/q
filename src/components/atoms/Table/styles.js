import styled from 'styled-components';
import { Theme } from 'theme';

export const SCTableHeaderCell = styled.th`
  text-align: center;
`;

export const SCTableCell = styled.td`
  position: relative;
  color: hsl(0, 0%, 70%);
  background-color: ${Theme.primaryBackgroundColor};
  border: none;
  border-bottom: 1px solid hsl(0, 0%, 87%);
  height: 60px;
  width: ${(props) => (props.isIcon ? '40px' : '400px')};
  padding: 0;

  span,
  a,
  button {
    position: absolute;
    top: 5px;
    left: 10px;
    white-space: nowrap;
  }

  svg {
    position: absolute;
    top: 15px;
    left: 12px;
  }

  ${(props) => props.isClickable && 'cursor: pointer'};

  ${(props) =>
    props.isFirstCell &&
    `::before {
      position: absolute;
      content: '';
      top: 7px;
      height: 40px;
      width: 1px;
      background-color: hsl(0, 0%, 87%);
    }`};

  ::after {
    position: absolute;
    content: '';
    top: 7px;
    left: calc(100% - 2px);
    height: 40px;
    width: 1px;
    background-color: hsl(0, 0%, 87%);
  }
`;
