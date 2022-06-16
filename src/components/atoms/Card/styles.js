import styled from 'styled-components';

export const SCCard = styled.div`
  height: 500px;
  width: 300px;
  margin-right: 20px;
  margin-bottom: 20px;
  padding: 5px 0px 0px 5px;
  transition: transform 250ms ease-out 0s;
  box-shadow: 0px 0px 10px 1px #aaaaaa;
  border-radius: 5px 5px 5px 5px;
  display: flex;
  flex-direction: column;

  :hover {
    transform: scaleX(1.05) scaleY(1.05);
    box-shadow: 1px 1px 15px 3px #ababab;
  }
`;

export const SCCardHeader = styled.div`
  flex: 1;
  font-size: 24px;
  margin: 5px;
`;

export const SCCardBody = styled.div`
  flex: 2;
  margin-left: 20px;
  margin-top: 20px;
`;

export const SCCardFooter = styled.div`
  flex: 1;
  display: flex;
  place-content: center;
`;
