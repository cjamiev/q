import styled, { css } from 'styled-components';
import { Theme } from 'theme';

const bgColorInfo = 'hsl(211, 100%, 86%)';
const bgColorSuccess = 'hsl(134, 41%, 83%)';
const bgColorWarning = 'hsl(45, 100%, 86%)';
const bgColorError = 'hsl(354, 70%, 87%)';

const statusInfo = css`
  color: hsl(211, 100%, 26%);
  background-color: hsl(211, 100%, 90%);
  border: 1px solid ${bgColorInfo};
`;

const statusSuccess = css`
  color: hsl(134, 61%, 21%);
  background-color: hsl(134, 41%, 88%);
  border: 1px solid ${bgColorSuccess};
`;

const statusWarning = css`
  color: hsl(45, 94%, 27%);
  background-color: hsl(46, 100%, 90%);
  border: 1px solid ${bgColorWarning};
`;

const statusError = css`
  color: hsl(354, 61%, 28%);
  background-color: hsl(355, 70%, 91%);
  border: 1px solid ${bgColorError};
`;

export const SCAlertWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  left: calc(100% - 325px);
  top: 0px;
  min-height: 150px;
  width: 300px;
  z-index: 2;
`;

export const SCAlert = styled.div`
  margin-top: 20px;
`;

export const SCAlertHeader = styled.h2`
  position: relative;
  font-size: 20px;
  text-transform: capitalize;
  padding: 5px 10px;

  ${(props) => {
    if (props.status === 'success') {
      return statusSuccess;
    }
    if (props.status === 'error') {
      return statusError;
    }
    if (props.status === 'info') {
      return statusInfo;
    } else {
      return statusWarning;
    }
  }}

  button {
    position: absolute;
    left: calc(100% - 30px);
    top: 1px;
    height: 10px;
    border: none;
    color: inherit;
    background-color: inherit;
    cursor: pointer;
  }
`;

const getBorderColor = css`
  ${(props) => {
    if (props.status === 'success') {
      return bgColorSuccess;
    }
    if (props.status === 'error') {
      return bgColorError;
    }
    if (props.status === 'info') {
      return bgColorInfo;
    } else {
      return bgColorWarning;
    }
  }}
`;

export const SCAlertContent = styled.div`
  border-left: 1px solid ${getBorderColor};
  border-right: 1px solid ${getBorderColor};
  border-bottom: 1px solid ${getBorderColor};
  padding: 5px 10px;
  background-color: ${Theme.white};

  span {
    font-size: 16px;
    white-space: normal;
  }
`;
