import styled from 'styled-components';
import { Theme } from 'theme';

export const SCSwitchBtnWrapper = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const SCSwitchBtn = styled.button`
  white-space: nowrap;
  text-align: center;
  font-size: 18px;
  color: #ffffff;
  background-color: ${Theme.secondaryColor};
  outline-offset: 1px;
  margin-right: 6px;
  box-shadow: rgba(0, 0, 0, 0.3) 4px 4px 8px 0px, rgba(0, 0, 0, 0.2) -8px -8px 8px 0px inset,
    rgba(255, 255, 255, 0.4) 8px 8px 8px 0px inset;
  cursor: pointer;

  ${(props) => props.isFirst && 'border-radius: 50px 0px 0px 50px'};
  ${(props) => props.isLast && 'border-radius: 0px 50px 50px 0px'};
  ${(props) => {
    return props.isActive
      ? `
    background-color: ${Theme.primaryColor};
    outline: 3px solid ${Theme.primaryColor};
    
    :hover {
      background-color: ${Theme.primaryColorHover};    
    }
    `
      : `
    background-color: ${Theme.secondaryColor};
    outline: 3px solid ${Theme.secondaryColor};
    
    :hover {
      background-color: ${Theme.secondaryColorHover};    
    }
    `;
  }};

  :active {
    transform: translateY(5px);
  }
`;
