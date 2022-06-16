import React, { useState } from 'react';
import Button from 'components/atoms/Button';
import Multiselect from './Multiselect';
import './SwapSelect.css';

const SwapSelect = ({ id, labelOne, labelTwo, listOne, listTwo, onChange }) => {
  const [listOneSelected, setListOne] = useState([]);
  const [listTwoSelected, setListTwo] = useState([]);

  const onListOneChange = ({ values }) => {
    setListOne(values);
  };
  const onListTwoChange = ({ values }) => {
    setListTwo(values);
  };

  const onSwapRight = () => {
    const updatedFilteredList = listOneSelected.filter((item) => !item.selected);
    const updatedAppendedList = listTwo.concat(listOneSelected.filter((item) => item.selected));

    setListOne([]);
    setListTwo([]);
    onChange({ id, listOne: updatedFilteredList, listTwo: updatedAppendedList });
  };

  const onSwapLeft = () => {
    const updatedFilteredList = listTwoSelected.filter((item) => !item.selected);
    const updatedAppendedList = listOne.concat(listTwoSelected.filter((item) => item.selected));

    setListOne([]);
    setListTwo([]);
    onChange({ id, listOne: updatedAppendedList, listTwo: updatedFilteredList });
  };

  return (
    <div className="swapselect-grid">
      <div>
        <Multiselect id={1} label={labelOne} values={listOne} onChange={onListOneChange} />
      </div>
      <div className="swapselect-btn-grid">
        <div>
          <Button
            label=">>"
            className="swapselect-swapright-btn"
            disabled={!listOneSelected.length}
            onClick={onSwapRight}
          />
          <Button
            label="<<"
            className="swapselect-swapleft-btn"
            disabled={!listTwoSelected.length}
            onClick={onSwapLeft}
          />
        </div>
      </div>
      <div className="swapselect-multiselect">
        <Multiselect id={2} label={labelTwo} values={listTwo} onChange={onListTwoChange} />
      </div>
    </div>
  );
};

export default SwapSelect;
