import styled from 'styled-components';

export const SCSectionWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const SCNextSongBtnWrapper = styled.div`
  display: block;
  margin-bottom: 10px;

  button {
    width: 250px;
  }
`;

export const SCSongCardWrapper = styled.div`
> div {
    background-color: ${(props) => (props.isAlreadyVisited ? 'black' : 'white')};
    height: 40px;
    width: 180px;
  }

  > div > div {
    text-align: center;
    margin: 0;
  }
`;
