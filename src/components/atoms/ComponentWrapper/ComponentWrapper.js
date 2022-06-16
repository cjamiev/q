import React from 'react';

const ComponentWrapper = (Component, props) => {
  return () => {
    return <Component {...props} />;
  };
};

export default ComponentWrapper;
