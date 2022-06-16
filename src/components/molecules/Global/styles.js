import styled from 'styled-components';

export const SCGlobalModal = styled.div`
  z-index: 2;
  position: absolute;
  display: flex;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5);
`;

export const SCGlobalModalLoading = styled.div`
  margin-top: 80px;
  font-size: 100px;
  display: flex;
  place-content: center;
  animation: fadeIn 1200ms linear 0s infinite normal forwards;
`;

export const SCGlobalModalLoadingName = styled.span`
  font-size: 50px;
  display: flex;
  place-content: center;
  text-align: center;
`;
