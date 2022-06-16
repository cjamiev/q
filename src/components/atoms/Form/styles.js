import styled from 'styled-components';

export const SCFlexWrapper = styled.div`
  display: flex;
`;

export const SCCreateFormFieldSet = styled.fieldset`
  width: 300px;
  padding: 10px;
  border-width: 2px;
  border-style: groove;
  border-color: threedface;
  border-image: initial;
`;

export const SCTimerQuickModifier = styled.div`
  position: relative;
  display: flex;
  margin: 5px 0;

  span {
    width: 60px;
  }

  svg {
    position: relative;
    top: 2px;
    left: 3px;
    margin-right: 5px;
    cursor: pointer;
  }

  svg:hover {
    transform: scale(1.1);
  }
`;
