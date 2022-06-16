import styled, { css, keyframes } from 'styled-components';
import { Theme } from 'theme';

const slideOut = keyframes`
  0% {
    opacity: 1;
    transform: translateX(0);
  }

  100% {
    width: 0;
    opacity: 0;
    transform: translateX(-600px);
  }
`;

const slideIn = keyframes`
  0% {
    width: 0;
    opacity: 0;
    transform: translateX(-600px);
  }

  100% {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const SCSidepanel = styled.div`
  position: relative;
  border-right: 1px solid rgb(228, 228, 228);
  animation: ${({ isTransitioningOut }) => {
    return isTransitioningOut
      ? css`
          ${slideOut} 500ms ease-out 0s 1 normal forwards;
        `
      : css`
          ${slideIn} 500ms ease-out 0s 1 normal forwards;
        `;
  }};
  ${(props) => {
    return props.isFullSize
      ? `
      position: absolute;
      background-color: ${Theme.white};
      z-index: 2;
      width: 100%;
      height: 100%;
    `
      : 'width: 650px';
  }};
`;

export const SCSidepanelHeader = styled.div`
  ${({ isFullSize }) => {
    return isFullSize
      ? 'height: 60px;'
      : `
      position: relative;
      height: 100px;
      white-space: nowrap;
    `;
  }}
`;

export const SCSidepanelTitle = styled.h2`
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
