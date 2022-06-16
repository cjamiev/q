import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateProject } from 'components/pages/Project/projectActions';
import { updateFilesByProjectRegex } from './projectRegexActions';
import Button from 'components/atoms/Button';
import Text from 'components/atoms/Form/Text';
import Checkbox from 'components/atoms/Form/Checkbox';
import NumberRange from 'components/atoms/Form/NumberRange';
import Dropdown from 'components/atoms/Form/Dropdown';
import { SCBtnGroup } from './styles';

const ZERO = 0;

export const MODIFIER_TYPES = [
  { label: 'Global', value: 'g', selected: false },
  { label: 'Case Insensitive', value: 'i', selected: false },
  { label: 'Multiline', value: 'm', selected: false }
];

export const formProjectRegex = (expression, modifiers) => {
  try {
    return { regex: new RegExp(expression, modifiers), isValid: true };
  } catch (e) {
    return { regex: '', isValid: false };
  }
};

const getUpdatedProjectRegex = ({
  regexes,
  description,
  fileProjectRegex,
  lineProjectRegex,
  selectedModifiers,
  lineRange,
  replace
}) => {
  const matched = regexes.find((item) => item.description === description);

  if (matched) {
    return regexes.map((item) => {
      if (item.description === description) {
        return {
          description,
          fileProjectRegex,
          lineProjectRegex,
          modifiers: selectedModifiers,
          lineRange,
          replace
        };
      }

      return item;
    });
  }

  return regexes.concat([
    {
      description,
      fileProjectRegex,
      lineProjectRegex,
      modifiers: selectedModifiers,
      lineRange,
      replace
    }
  ]);
};

const ProjectRegex = ({ root, directories, regexes }) => {
  const dispatch = useDispatch();
  const [regexKeys, setProjectRegexKeys] = useState([]);
  const [description, setDescription] = useState('');
  const [fileProjectRegex, setFileProjectRegex] = useState('');
  const [lineProjectRegex, setLineProjectRegex] = useState('');
  const [replace, setReplace] = useState('');
  const [modifier, setModifier] = useState(MODIFIER_TYPES);
  const [lineRange, setLineRange] = useState({ start: '', end: '' });
  const [rangeError, setRangeError] = useState('');

  const selectedModifiers = modifier
    .filter((item) => item.selected)
    .map((item) => item.value)
    .join('');
  const fileRegExp = formProjectRegex(fileProjectRegex);
  const lineRegExp = formProjectRegex(lineProjectRegex, selectedModifiers);

  useEffect(() => {
    const REGEX_KEYS = regexes.map((r) => {
      return { label: r.description, value: r, selected: false };
    });
    setProjectRegexKeys(REGEX_KEYS);
  }, [regexes]);

  return (
    <div className="flex--vertical">
      <Dropdown
        label="ProjectRegexes"
        values={regexKeys}
        onChange={({ values }) => {
          const selected = values.find((item) => item.selected);

          setDescription(selected.value.description);
          setFileProjectRegex(selected.value.fileProjectRegex);
          setLineProjectRegex(selected.value.lineProjectRegex);
          setLineRange(selected.value.lineRange);
          setReplace(selected.value.replace);
          setModifier(
            modifier.map((item) => {
              return {
                ...item,
                selected: selected.value.modifiers.includes(item.value)
              };
            })
          );
        }}
      />
      <Text
        label="Description"
        selected={description}
        onChange={({ selected }) => {
          setDescription(selected);
        }}
      />
      <div className="flex--horizontal">
        <Text
          label="File ProjectRegex"
          error={!fileRegExp.isValid}
          errorMessage="Not valid regex expression"
          selected={fileProjectRegex}
          onChange={({ selected }) => {
            setFileProjectRegex(selected);
          }}
        />
        <Text
          label="Line ProjectRegex"
          error={!lineRegExp.isValid}
          errorMessage="Not valid regex expression"
          selected={lineProjectRegex}
          onChange={({ selected }) => {
            setLineProjectRegex(selected);
          }}
        />
        <Text
          label="Replace"
          selected={replace}
          onChange={({ selected }) => {
            setReplace(selected);
          }}
        />
        <NumberRange
          label="Substring"
          selected={lineRange}
          error={rangeError}
          min={ZERO}
          max={100}
          onChange={({ selected, error }) => {
            setLineRange(selected);
            setRangeError(error);
          }}
        />
      </div>
      <Checkbox
        label="Select Modifier(s)"
        values={modifier}
        onChange={({ values }) => {
          setModifier(values);
        }}
      />
      <SCBtnGroup>
        <Button
          isPrimary
          label="Submit"
          onClick={() => {
            if (fileRegExp.isValid && lineRegExp.isValid && !rangeError) {
              dispatch(
                updateFilesByProjectRegex(root, {
                  fileProjectRegex,
                  lineProjectRegex,
                  modifiers: selectedModifiers,
                  lineRange,
                  replace
                })
              );
            }
          }}
        />
        <Button
          label="Save"
          onClick={() => {
            if (fileRegExp.isValid && lineRegExp.isValid && !rangeError && description) {
              const updatedProjectRegexes = getUpdatedProjectRegex({
                regexes,
                description,
                fileProjectRegex,
                lineProjectRegex,
                selectedModifiers,
                lineRange,
                replace
              });
              dispatch(updateProject({ directories, regexes: updatedProjectRegexes }));
            }
          }}
        />
        <Button
          label="Delete"
          onClick={() => {
            if (description) {
              const updatedProjectRegexes = regexes.filter((item) => item.description !== description);
              dispatch(updateProject({ directories, regexes: updatedProjectRegexes }));
            }
          }}
        />
      </SCBtnGroup>
    </div>
  );
};

export default ProjectRegex;
