import styled from 'styled-components';

export const SCFileBtnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 10px;
  row-gap: 10px;

  button {
    width: 250px;
  }
`;

export const SCFileNameWrapper = styled.div`
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
