import styled from 'styled-components';
import { Theme } from 'theme';

export const SCPackageTitle = styled.h3`
  margin-bottom: 10px;
`;

export const SCFlexWrapper = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.isColumnMode ? 'column' : 'row')};

  ${Theme.getMediaQuery(Theme.S, Theme.M, Theme.L)} {
    flex-direction: column;
  }
`;

export const SCNpmTables = styled.div`
  display: flex;
  column-gap: 20px;
  margin-right: 20px;
`;

export const SCTableHeaderCell = styled.th`
  text-align: center;
`;

export const SCTableCell = styled.td`
  position: relative;
  color: ${(props) => (props.isActive ? 'hsl(0,0%,0%)' : 'hsl(0, 0%, 70%)')};
  background-color: ${(props) => (props.isActive ? 'hsl(240,85%,75%)' : Theme.primaryBackgroundColor)};
  border: 1px solid hsl(0, 0%, 87%);
  height: 40px;
  width: ${(props) => (props.isSmall ? '40px' : '400px')};
  padding: 0;
  ${(props) => props.isClickable && 'cursor: pointer'};

  span {
    position: absolute;
    top: 10px;
    left: 5px;
    white-space: nowrap;
  }
`;

export const SCNpmBtnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 10px;
  row-gap: 5px;

  button {
    width: 200px;
    height: 60px;
  }
`;
