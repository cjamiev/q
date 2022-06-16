import styled from 'styled-components';
import Button from 'components/atoms/Button';

export const SCDirSidePanelWrapper = styled.div`
  padding-top: 20px;
  padding-left: 20px;
`;

export const SCDirPath = styled.div`
  h3 {
    font-size: 30px;
  }

  div {
    display: flex;
    position: relative;
  }

  svg {
    cursor: pointer;
    position: relative;
    bottom: 12px;
  }

  svg:hover {
    transform: scale(1.1);
  }
`;

export const SCDirBtnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 5px;
  width: 400px;
`;

export const SCDirectoryBtn = styled(Button)`
  width: 200px;
  height: 60px;
  border-radius: 0;
  background-color: hsl(204, 89%, 18%);
  color: #fff;
  font-size: 16px;
  cursor: pointer;

  :hover {
    background-color: hsl(204, 100%, 35%);
  }
`;
