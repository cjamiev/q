import styled from 'styled-components';

export const SCMusicCardWrapper = styled.form`
  display: flex;
  flex-direction: column;
  padding: 16px;
  width: 300px;
  height: 250px;
  border: 1px solid black;
  border-radius: 10px;
`;

export const SCMusicCardLabel = styled.label`
  color: black;
  font-weight: 500;
`;

export const SCMusicCardLink = styled.a`
  right: 15px;
  bottom: 15px;
  padding: 10px;
  background: white;
  font-weight: 600;
  text-align: center;
  place-content: center;
  border-radius: 5px;
  color: black;
  background: white;

  &:hover {
    outline: 1px solid black;
    background: white;
    color: black;
  }
`;
export const SCMusicCardInput = styled.input`
  width: 90%;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #e0e7ff;
  margin-top: 4px;
  margin-bottom: 15px;
  font-size: 15px;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;
export const SCMusicCardSubmit = styled.button`
  padding: 10px 0;
  border-radius: 6px;
  border: none;
  background: black;
  color: white;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  box-shadow: 0 1px 4px rgba(79, 70, 229, 0.08);
  transition: background-color 0.2s;

  &:hover {
    border: 1px solid black;
    background: white;
    color: black;
  }
`;