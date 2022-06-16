import styled from 'styled-components';

export const SCFlexWrapper = styled.div`
  display: flex;
  ${(props) => props.isVertical && 'flex-direction: column'};
`;

export const SCFileBtnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 10px;
  row-gap: 10px;

  button {
    width: 250px;
  }
`;
