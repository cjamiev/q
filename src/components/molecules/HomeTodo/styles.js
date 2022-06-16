import styled from 'styled-components';

export const SCTodoTab = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const SCTodoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  min-height: 200px;
  padding-top: 10px;
  padding-left: 10px;
  margin-top: 10px;
  margin-right: 10px;
  margin-bottom: 10px;

  box-shadow: 0px 4px 4px 1px hsl(0, 0%, 80%);
`;

export const SCTodoTitleWrapper = styled.div`
  display: flex;
  position: relative;

  h2 {
    font-size: 24px;
    text-decoration: underline;
    min-width: 18ch;
  }

  svg {
    position: relative;
    margin: 0;
    padding: 0;
  }
`;

export const SCTodoList = styled.ul`
  display: flex;
  flex-direction: column;

  li {
    font-size: 20px;
  }
`;

export const SCCreateFormFieldSet = styled.fieldset`
  width: 350px;
  padding: 10px;
  border-width: 2px;
  border-style: groove;
  border-color: threedface;
  border-image: initial;
  margin-right: 10px;

  input {
    margin-bottom: 5px;
  }
`;
