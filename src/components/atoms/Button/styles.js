import styled from 'styled-components';
import { Theme } from 'theme';

export const SCButton = styled.button`
  min-height: 50px;
  border-radius: 10px;
  border-width: 0;
  color: #fff;
  box-shadow: rgba(0, 0, 0, 0.3) 4px 4px 8px 0px, rgba(0, 0, 0, 0.2) -8px -8px 8px 0px inset,
    rgba(255, 255, 255, 0.4) 8px 8px 8px 0px inset;
  cursor: pointer;

  :active {
    transform: scale(0.98);
  }

  ${(props) => {
    return props.isPrimary
      ? `
        background-color: ${Theme.primaryColor};
        
        :hover {
          background-color: ${Theme.primaryColorHover};
        }`
      : `
        background-color: ${Theme.secondaryColor};

        :hover {
          background-color: ${Theme.secondaryColorHover};
        }
      `;
  }};
`;
