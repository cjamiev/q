import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Text from 'components/atoms/Form/Text';
import Dropdown from 'components/atoms/Form/Dropdown';
import Button from 'components/atoms/Button';
import TimerForm from 'components/atoms/Form/TimerForm';
import ValueForm from 'components/atoms/Form/ValueForm';
import CommandForm from 'components/atoms/Form/CommandForm';
import ClipboardList from 'components/molecules/ClipboardList';
import { ClipboardDisplayContent } from 'components/atoms/ClipboardDisplayContent';
import Table, { SCTableCell } from 'components/atoms/Table';
import { updateClipboard } from 'components/pages/Clipboard/clipboardActions';
import { TYPE } from 'constants/type';
import { ArrowSVG } from 'components/atoms/Icons/ArrowSVG';
import { TrashSVG } from 'components/atoms/Icons';
import { decrementElementIndex, incrementElementIndex, swapArrayElementPositions } from 'utils/arrayHelper';
import { SCFlexWrapper } from './styles';

const ZERO = 0;
const ONE = 1;
const CLIPBOARD_TYPES = [
  { label: TYPE.COPY, selected: true },
  { label: TYPE.COMMAND, selected: false },
  { label: TYPE.LINK, selected: false },
  { label: TYPE.TEXT, selected: false },
  { label: TYPE.TIMER, selected: false }
];

const getUpdatedData = (data, currentIndex, entry) => {
  const matched = data[currentIndex];

  if (matched) {
    return data.map((item, index) => {
      if (index === currentIndex) {
        return entry;
      }
      return item;
    });
  }

  return [...data, entry];
};

const renderCells = ({ entry, removeItem, moveItemUp, moveItemDown }) => {
  return entry.map(({ type, label, value }, index) => (
    <tr key={`${label}-${index}`} data-testid={entry.label}>
      <SCTableCell>
        <ClipboardDisplayContent key={`${type}-${label}-${value}`} type={type} label={label} value={value} />
      </SCTableCell>
      <SCTableCell isIcon>
        <TrashSVG
          width="27"
          height="27"
          onClick={() => {
            removeItem(index);
          }}
        />
      </SCTableCell>
      <SCTableCell isIcon>
        <ArrowSVG
          conditions={{ orientation: 'UP' }}
          ariaLabel="Move Up"
          width="27"
          height="27"
          onClick={() => {
            moveItemUp(index);
          }}
        />
      </SCTableCell>
      <SCTableCell isIcon>
        <ArrowSVG
          conditions={{ orientation: 'DOWN' }}
          ariaLabel="Move Down"
          width="27"
          height="27"
          onClick={() => {
            moveItemDown(index);
          }}
        />
      </SCTableCell>
    </tr>
  ));
};

const ClipboardForm = ({ records }) => {
  const dispatch = useDispatch();
  const CLIPBOARD_KEYS = Object.keys(records).map((filename) => {
    return { label: filename, selected: false };
  });
  const [existingKeys, setExistingKeys] = useState(CLIPBOARD_KEYS);
  const [existingTitles, setExistingTitles] = useState([]);
  const [key, setKey] = useState('');
  const [title, setTitle] = useState('');
  const [types, setTypes] = useState(CLIPBOARD_TYPES);
  const [entry, setEntry] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(ZERO);
  const [data, setData] = useState([]);

  useEffect(() => {
    const selectedKey = existingKeys.find((item) => item.selected);
    if (selectedKey) {
      const titleList = records[selectedKey.label].map((item) => {
        return { label: item.title, selected: false };
      });
      setKey(selectedKey.label);
      setExistingTitles(titleList);
    }
  }, [records, title, existingKeys]);

  useEffect(() => {
    const selectedKey = existingKeys.find((item) => item.selected);
    const selectedTitle = existingTitles.find((item) => item.selected);
    if (selectedTitle) {
      const selectedData = records[selectedKey.label].find((item) => item.title === selectedTitle.label).data;
      setTitle(selectedTitle.label);
      setData(selectedData);
      setCurrentIndex(selectedData.length);
    }
  }, [records, title, existingKeys, existingTitles]);

  const removeItem = (selectedIndex) => {
    const updatedItems = entry.filter((_, index) => index !== selectedIndex);

    setEntry(updatedItems);
  };

  const moveItemUp = (selectedIndex) => {
    const foundIndex = entry.findIndex((_, index) => index === selectedIndex);
    const updatedItems = decrementElementIndex(entry, foundIndex);

    setEntry(updatedItems);
  };

  const moveItemDown = (selectedIndex) => {
    const foundIndex = entry.findIndex((_, index) => index === selectedIndex);
    const updatedItems = incrementElementIndex(entry, foundIndex);

    setEntry(updatedItems);
  };

  const handleClickEntry = (selectedIndex, selectedEntry) => {
    setCurrentIndex(selectedIndex);
    setEntry(selectedEntry);
  };

  const renderForm = (type) => {
    if (selectedType.label === TYPE.TIMER) {
      return (
        <TimerForm
          onChange={({ name, content }) => {
            const newDate = new Date(
              content.year,
              content.month - ONE,
              content.day,
              content.hour,
              content.minute,
              content.second
            );

            setEntry([...entry, { label: name, value: newDate.toString(), type: selectedType.label }]);
          }}
          value={defaultValue}
        />
      );
    } else if (selectedType.label === TYPE.COMMAND) {
      return (
        <CommandForm
          onChange={({ name, content }) => {
            setEntry([...entry, { label: name, value: content, type: selectedType.label }]);
          }}
        />
      );
    } else {
      return (
        <ValueForm
          type={selectedType}
          onChange={({ name, content }) => {
            setEntry([...entry, { label: name, value: content, type: selectedType.label }]);
          }}
        />
      );
    }
  };

  const selectedType = types.find((item) => item.selected);
  const addLabel = data[currentIndex] ? 'Update' : 'Add';
  const defaultValue = { name: '', time: new Date() };

  const renderFormSection = () => {
    return (
      <div>
        <h2>Form</h2>
        <Dropdown
          label="Existing Key"
          values={existingKeys}
          onChange={({ values }) => {
            setExistingKeys(values);
          }}
        />
        {existingTitles.length > ZERO && (
          <Dropdown
            label="Existing Title"
            values={existingTitles}
            onChange={({ values }) => {
              setExistingTitles(values);
            }}
          />
        )}
        <Text
          label="Key"
          selected={key}
          onChange={({ selected }) => {
            setKey(selected);
          }}
        />
        <Text
          label="Title"
          selected={title}
          onChange={({ selected }) => {
            setTitle(selected);
          }}
        />
        <Dropdown
          label="Type"
          values={types}
          onChange={({ values }) => {
            setTypes(values);
          }}
        />
        {renderForm(selectedType)}
      </div>
    );
  };

  const renderEntrySection = () => {
    return (
      <div>
        <h2>Entry #{currentIndex + ONE}</h2>
        <Button
          label={addLabel}
          isPrimary
          onClick={() => {
            const updatedData = getUpdatedData(data, currentIndex, entry);
            setEntry([]);
            setData(updatedData);
            setCurrentIndex(updatedData.length);
          }}
        />
        <Button
          label="Remove"
          isPrimary
          onClick={() => {
            setEntry([]);
            setData(data.filter((item, indx) => indx !== currentIndex));
          }}
        />
        {entry.length > ZERO && (
          <Table
            headers={[{ label: 'Clip' }, { label: 'Trash' }, { label: 'Move Up' }, { label: 'Move Down' }]}
            body={renderCells({ entry, removeItem, moveItemUp, moveItemDown })}
          />
        )}
      </div>
    );
  };

  const renderDataSection = () => {
    return (
      <div>
        <h2>Data</h2>
        {key && title && (
          <Button
            label="Submit"
            isPrimary
            onClick={() => {
              const section = records[key] || [];
              const filteredSection = section.filter((item) => item.title !== title);
              const updatedSection = [...filteredSection, { title, data }];

              const content = { ...records, [key]: updatedSection };

              dispatch(updateClipboard(content));
            }}
          />
        )}
        {records.hasOwnProperty(key) && title && (
          <Button
            label="Delete"
            isPrimary
            onClick={() => {
              const updatedSection = records[key].filter((item) => item.title !== title);

              const content = { ...records, [key]: updatedSection };

              dispatch(updateClipboard(content));
              setEntry([]);
              setData([]);
            }}
          />
        )}
        <ClipboardList key={title} header={title} data={data} handleClick={handleClickEntry} />
      </div>
    );
  };

  return (
    <SCFlexWrapper>
      {renderFormSection()}
      {entry.length > ZERO && renderEntrySection()}
      {data.length > ZERO && renderDataSection()}
    </SCFlexWrapper>
  );
};

export default ClipboardForm;
