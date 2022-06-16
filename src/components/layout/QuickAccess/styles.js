import styled from 'styled-components';
import { Theme } from 'theme';

export const SCQuickAccess = styled.footer`
  position: fixed;
  z-index: 2;
  width: 400px;
  bottom: -20px;
  left: calc(100% - 400px);
  display: flex;
  flex-direction: column;
  background-color: ${Theme.secondaryBackgroundColor};
  border-radius: 10px 10px 0 0;
`;

export const SCQuickAccessBtnGroup = styled.div`
  display: flex;
  border-bottom: 1px solid ${Theme.secondaryBackgroundColor};
`;

export const SCQuickAccessBtn = styled.button`
  border: none;
  color: ${Theme.white};
  min-height: 50px;
  cursor: pointer;
  background-color: ${Theme.secondaryBackgroundColor};
  flex: 1;
  ${(props) => props.isActive && `background-color: ${Theme.secondaryBackgroundColorHover};`};

  :hover {
    background-color: ${Theme.secondaryBackgroundColorHover};
    outline: none;
  }
`;

export const SCQuickAccessList = styled.div`
  display: flex;
  flex-direction: column;
  height: ${(props) => (props.isVisible ? '500px' : '0px')};
  background-color: ${Theme.secondaryBackgroundColor};
  margin-top: 20px;
  transition: height 500ms;
`;

export const SCQuickAccessListBtn = styled.button`
  border: none;
  color: ${Theme.white};
  min-height: 50px;
  background-color: ${Theme.secondaryBackgroundColor};
  cursor: pointer;

  :hover {
    background-color: ${Theme.secondaryBackgroundColorHover};
    outline: none;
  }

  :active {
    background-color: ${Theme.secondaryBackgroundColorHover};
  }
`;
