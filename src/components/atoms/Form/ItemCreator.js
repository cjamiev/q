import React, { useEffect, useState } from 'react';
import Text from 'components/atoms/Form/Text';
import { PlusSVG } from 'components/atoms/Icons/PlusSVG';
import { MinusSVG } from 'components/atoms/Icons/MinusSVG';
import { SCFlexWrapper } from './styles';

const ItemCreator = ({ data, placeholder, onChange }) => {
  const [items, setItems] = useState([]);
  const [currentItem, setCurrentItem] = useState('');

  useEffect(() => {
    setItems(data);
  }, [data]);

  return (
    <div>
      {items.map((val) => {
        return (
          <SCFlexWrapper key={val}>
            <label>{val}</label>
            <MinusSVG
              ariaLabel="Remove Item"
              width="25"
              height="25"
              onClick={() => {
                const filteredItems = items.filter((i) => i !== val);
                setItems(filteredItems);
                onChange(filteredItems);
              }}
            />
          </SCFlexWrapper>
        );
      })}
      <SCFlexWrapper>
        <Text
          placeholder={placeholder}
          selected={currentItem}
          onChange={({ selected }) => {
            setCurrentItem(selected);
          }}
        />
        {currentItem && (
          <PlusSVG
            ariaLabel="Add Item"
            width="25"
            height="25"
            onClick={() => {
              const updatedItems = items.concat(currentItem);
              setItems(updatedItems);
              setCurrentItem('');
              onChange(updatedItems);
            }}
          />
        )}
      </SCFlexWrapper>
    </div>
  );
};

export default ItemCreator;
