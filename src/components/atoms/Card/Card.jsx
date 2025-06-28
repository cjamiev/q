import React from 'react';
import { SCCard, SCCardHeader, SCCardBody, SCCardFooter } from './styles';

const Card = ({ title, body, footer }) => {
  return (
    <SCCard>
      <SCCardHeader>{title}</SCCardHeader>
      <SCCardBody>{body}</SCCardBody>
      <SCCardFooter>{footer}</SCCardFooter>
    </SCCard>
  );
};

export default Card;
