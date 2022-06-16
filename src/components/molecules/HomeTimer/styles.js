import styled from 'styled-components';

export const SCTimerTab = styled.div`
  display: flex;
`;

export const SCTimers = styled.div`
  margin-left: 20px;
  display: flex;
  flex-wrap: wrap;
`;

export const SCHomeCardWrapper = styled.div`
  > div {
    height: ${(props) => (props.isLarge ? '350px' : '250px')};
    width: ${(props) => (props.isLarge ? '500px' : '200px')};
  }

  > div > div:first-child {
    font-size: 20px;
  }

  > div > div:nth-child(2) {
    text-align: left;
  }

  > div > div:last-child {
    margin-bottom: 10px;
  }
`;
