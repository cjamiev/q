import styled from 'styled-components';

export const SCContents = styled.div`
  position: absolute;
  visibility: hidden;
`;

export const SCWrapper = styled.div`
  position: relative;

  &:hover {
    ${SCContents} {
      visibility: visible;
    }
  }
`;
