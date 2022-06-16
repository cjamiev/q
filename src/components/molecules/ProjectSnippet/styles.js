import styled from 'styled-components';
import Button from 'components/atoms/Button';

export const SCFlexWrapper = styled.div`
  display: flex;
`;

export const SCCreateFormFieldSet = styled.fieldset`
  width: 350px;
  padding: 10px;
  border-width: 2px;
  border-style: groove;
  border-color: threedface;
  border-image: initial;

  div {
    margin-bottom: 10px;
    margin-left: 6px;
  }

  button {
    margin-left: 12px;
  }
`;

export const SCLoadHeader = styled.div`
  display: flex;
  margin-bottom: 10px;

  h2 {
    margin-top: 10px;
    margin-left: 20px;
  }

  svg {
    cursor: pointer;
  }

  svg:hover {
    transform: scale(1.1);
  }
`;

export const SCLoadBtnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-flow: column wrap;
  max-height: 500px;
  row-gap: 5px;
  margin-left: 10px;
`;

export const SCLoadButton = styled(Button)`
  background-color: hsl(204, 89%, 18%);
  border: 1px solid hsl(204, 100%, 10%);
  color: #fff;
  margin: 0px 10px;
  border-radius: 0;
  font-size: 16px;
  height: 50px;
  width: 220px;
  cursor: pointer;

  :hover {
    background-color: hsl(204, 100%, 35%);
  }
`;

export const SCButtonGroup = styled.div`
  display: inline-flex;
`;

export const SCSnippetTextWrapper = styled.div`
  width: 800px;
  margin-top: 10px;
  margin-right: 20px;

  textarea {
    height: 600px;
  }
`;
