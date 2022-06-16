import styled from 'styled-components';
import { Theme } from 'theme';

export const SCNavigation = styled.nav`
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  width: 65px;
  height: 100vh;
  transition: width 500ms;
  z-index: 1;

  :hover {
    width: 250px;
  }
`;

export const SCWeek = styled.span`
  position: relative;
  left: 20px;
  bottom: 3px;
  font-size: 24px;
  font-weight: bold;

  ::after {
    content: '';
    height: 30px;
    width: 30px;
    border: 2px solid white;
    border-radius: 50%;
    display: inline-block;
    position: relative;
    right: ${(props) => (props.isTwoDigit ? '30px' : '23px')};
    top: 8px;
  }
`;

export const SCNavigationContent = styled.nav`
  width: inherit;
  position: fixed;
  overflow: hidden;
  height: 100vh;
  background-color: ${Theme.secondaryBackgroundColor};
  color: ${Theme.white};
`;

export const SCNavigationLinks = styled.div`
  position: relative;
  height: 50px;
  cursor: pointer;
  top: 10px;

  :hover {
    background-color: ${Theme.secondaryBackgroundColorHover};
  }

  ${({ isActive }) =>
    isActive &&
    `
    background-color: ${Theme.secondaryBackgroundColorHover};
  `}
`;

export const SCNavigationIcon = styled.div`
  margin: 5px 10px;
  position: absolute;
  left: 5px;

  ${({ isActive }) =>
    isActive &&
    `
    ::before {
      content: "";
      position: absolute;
      height: 45px;
      width: 3px;
      left: -10px;
      bottom: 15px;
      background-color: ${Theme.white};
    }
  `}
`;

export const SCNavigationLabels = styled.span`
  position: relative;
  top: 10px;
  left: 70px;
  font-size: 24px;
  white-space: nowrap;
`;
