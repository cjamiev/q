import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from 'components/atoms/Button';
import Text from 'components/atoms/Form/Text';
import { TrashSVG } from 'components/atoms/Icons';
import {
  SCTable,
  SCTableHeaderCell,
  SCSettingsWrapper,
  SCTableCell,
  SCTableHidden,
  SCTableOverlayText,
  SCCellValue,
  SCCellLongValue,
  SCCreateFormFieldSet
} from './styles';

const ZERO = 0;
const MAX_SIZE = 50;

const getLongValue = (item) => {
  const isLongValue = item.value.length > MAX_SIZE;
  const value = isLongValue ? `${item.value.slice(ZERO, MAX_SIZE)}...` : item.value;

  return { isLongValue, value };
};

const TableCellValue = ({ item, isHidden }) => {
  const { isLongValue, value } = getLongValue(item);

  if (isHidden) {
    return (
      <SCTableCell>
        <SCTableOverlayText>Click to see</SCTableOverlayText>
        <SCTableHidden>{item.value}</SCTableHidden>
      </SCTableCell>
    );
  } else {
    return (
      <SCTableCell>
        <SCCellValue>{value}</SCCellValue>
        {isLongValue && <SCCellLongValue>{item.value}</SCCellLongValue>}
      </SCTableCell>
    );
  }
};

const SettingsTable = ({ headers, body }) => {
  const renderHeaders = headers.map((item) => {
    return <SCTableHeaderCell key={item.label}>{item.label}</SCTableHeaderCell>;
  });

  return (
    <SCTable>
      <thead>
        <tr>{renderHeaders}</tr>
      </thead>
      <tbody>{body}</tbody>
    </SCTable>
  );
};

export const SettingsTab = ({ settingsData, labels, isHidden = false, onChange }) => {
  const dispatch = useDispatch();
  const [newSettings, setNewSettings] = useState({ label: '', value: '' });
  const [currentSettingsuration, setCurrentSettingsuration] = useState([]);

  useEffect(() => {
    setCurrentSettingsuration(settingsData);
  }, [settingsData]);

  const renderCommandCells = () => {
    return currentSettingsuration.map((item) => {
      return (
        <tr key={item.value}>
          <SCTableCell isFirstCell>
            <SCCellValue>{item.label}</SCCellValue>
          </SCTableCell>
          <TableCellValue item={item} isHidden={isHidden} />
          <SCTableCell isIcon>
            <TrashSVG
              transform="scale(0.6) translate(35,-2)"
              width="45"
              onClick={() => {
                const updatedSettingsuration = currentSettingsuration.filter((c) => c.value !== item.value);

                onChange(updatedSettingsuration);
              }}
            />
          </SCTableCell>
        </tr>
      );
    });
  };

  return (
    <div>
      <SCSettingsWrapper>
        <div>
          <SettingsTable headers={labels.tableHeaders} body={renderCommandCells()} />
        </div>
        <form>
          <SCCreateFormFieldSet>
            <legend> {labels.legend} </legend>
            <Text
              placeholder={labels.inputLabel}
              selected={newSettings.label}
              onChange={({ selected }) => {
                setNewSettings({ label: selected, value: newSettings.value, id: currentSettingsuration.length });
              }}
            />
            <Text
              placeholder={labels.inputValue}
              selected={newSettings.value}
              onChange={({ selected }) => {
                setNewSettings({ label: newSettings.label, value: selected, id: currentSettingsuration.length });
              }}
            />
            <Button
              isPrimary
              label="Submit"
              onClick={(e) => {
                e.preventDefault();
                const updatedSettingsuration = [newSettings].concat(currentSettingsuration);

                onChange(updatedSettingsuration);
              }}
            />
          </SCCreateFormFieldSet>
        </form>
      </SCSettingsWrapper>
    </div>
  );
};
