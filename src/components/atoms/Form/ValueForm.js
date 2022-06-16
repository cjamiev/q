import React, { useState } from 'react';
import Button from 'components/atoms/Button';
import Text from 'components/atoms/Form/Text';
import TextArea from 'components/atoms/Form/TextArea';
import { TYPE } from 'constants/type';

const ValueForm = ({ type, onChange }) => {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');

  return (
    <div>
      <Text
        label="Name"
        selected={name}
        onChange={({ selected }) => {
          setName(selected);
        }}
      />
      {type === TYPE.COPY ? (
        <TextArea
          label="Value"
          selected={content}
          onChange={({ selected }) => {
            setContent(selected);
          }}
        />
      ) : (
        <Text
          label="Value"
          selected={content}
          onChange={({ selected }) => {
            setContent(selected);
          }}
        />
      )}
      <Button
        label="Save"
        isPrimary
        onClick={() => {
          if (name && content) {
            onChange({ name, content });
            setName('');
            setContent('');
          }
        }}
      />
    </div>
  );
};

export default ValueForm;
