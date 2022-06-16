import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`;

export const SCLayout = styled.div`
  display: flex;
  width: 100%;
`;

export const SCPageWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  min-height: 830px;
  animation: ${fadeIn} 500ms ease 0s 1 normal forwards;
`;

export const SCPage = styled.div`
  padding-left: 10px;
  width: ${(props) => (props.isSideBarFullSize ? '0px' : '100%')};
`;

export const SCPageHeader = styled.div`
  position: relative;
  height: 100px;
  white-space: nowrap;
`;

export const SCPageHeaderTitle = styled.h1`
  display: inline-block;
  margin-top: 10px;
  margin-left: 10px;
`;

export const SCSidepanelBtn = styled.div`
  display: inline-block;
  margin-left: 10px;

  svg {
    cursor: pointer;
  }
`;
