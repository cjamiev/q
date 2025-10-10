import styled from 'styled-components';

export const SCStorageWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const SCStorageDropdown = styled.div`
  position: relative;
`;

export const SCStorageBtnWrapper = styled.div`
  visibility: ${(props) => (props.isvisible ? 'visible' : 'hidden')};
  position: absolute;
  display: flex;
  flex-direction: column;
  margin-right: 10px;
  row-gap: 10px;

  button {
    width: 250px;
  }
`;

export const SCStorageNameWrapper = styled.div`
  display: flex;
  position: relative;
  cursor: pointer;

  svg {
    position: relative;
    bottom: 5px;
  }

  svg:hover {
    transform: scale(1.1);
  }
`;

export const SCStorageTextWrapper = styled.div`
  margin-top: 10px;
`;

export const SCStorageOpWrapper = styled.div``;
