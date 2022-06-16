import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import useLocalStorage from './useLocalStorage';
import { mockLocalStorage } from 'testHelper';

const ONE = 1;
const localStorageProps = {
  testStr: 'test-str',
  testObj: JSON.stringify({
    one: 1,
    two: 'Two'
  })
};

mockLocalStorage(localStorageProps);

const TestComponent = ({ itemKey, initialValue, shouldParse }) => {
  const [data, setData] = useLocalStorage(itemKey, initialValue, shouldParse);
  const updateData = () => {
    if(shouldParse) {
      const keySize = Object.keys(data).length + ONE;
      const updated = {
        ...data,
        [keySize]: keySize
      };
      setData(updated);
    }
    else {
      setData(data.slice(data.length-ONE));
    }
  };
  const renderData = shouldParse ? JSON.stringify(data) : data;

  return (
    <>
      <button onClick={updateData}>update</button>
      <div>{renderData}</div>
    </>
  );
};

describe('useLocalStorage', () => {
  it('should handle string', () => {
    render(
      <TestComponent
        itemKey='testStr'
        initialValue='test'
        shouldParse={false}
      />
    );

    expect(screen.queryByText(localStorageProps.testStr)).toBeInTheDocument();

    fireEvent.click(screen.getByText('update'));
    expect(
      screen.queryByText(
        localStorageProps.testStr.slice(localStorageProps.testStr.length-ONE)
      )
    ).toBeInTheDocument();
  });

  it('should handle object', () => {
    render(
      <TestComponent
        itemKey='testObj'
        initialValue={'{}'}
        shouldParse={true}
      />
    );

    expect(screen.queryByText(localStorageProps.testObj)).toBeInTheDocument();

    fireEvent.click(screen.getByText('update'));
    // For some reason localStorageProps.testObj is updated to the correct value
    expect(
      screen.queryByText(localStorageProps.testObj)
    ).toBeInTheDocument();
  });
});
