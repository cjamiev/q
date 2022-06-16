import styled from 'styled-components';
import { Theme } from 'theme';

export const SCClipboardContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  margin: 0 auto;

  ${Theme.getMediaQuery(Theme.L)} {
    display: grid;
    grid-template-columns: auto auto;
  }

  ${Theme.getMediaQuery(Theme.M, Theme.S)} {
    display: flex;
    flex-direction: column;
  }
`;
