/* eslint-disable no-magic-numbers */
import React from 'react';
import { DataGenerator } from 'components/atoms/Generator';

const stripData = (data) => {
  return data.split('').map((i) => {
    if (!isNaN(Number(i))) {
      return '';
    }

    return i;
  });
};

export const HomeTest = () => {
  return (
    <div>
      <DataGenerator />
    </div>
  );
};
