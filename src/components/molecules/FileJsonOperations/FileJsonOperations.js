import React from 'react';
import { useDispatch } from 'react-redux';
import { createAlert, dismissAlert } from 'components/layout/Alert/alertActions';
import Button from 'components/atoms/Button';
import { parseObject, isJSONString } from 'utils/type-check';
import { SCFlexWrapper, SCFileBtnWrapper } from './styles';

const TWO = 2;

export const FileJsonOperations = ({ content, onChange }) => {
  const dispatch = useDispatch();

  return (
    <SCFlexWrapper isVertical>
      <h3> JSON </h3>
      <SCFileBtnWrapper>
        <Button
          label="Validate"
          onClick={() => {
            dispatch(dismissAlert());
            const isValid = isJSONString(content);
            if (isValid) {
              onChange(JSON.stringify(JSON.parse(content), undefined, TWO));
            }
            const message = isValid ? 'Valid' : 'NOT Valid';
            const status = isValid ? 'success' : 'error';
            dispatch(createAlert({ content: message, status }));
          }}
        />
        <Button
          label="Stringify"
          onClick={() => {
            onChange(
              JSON.stringify(content)
                .replace(/\\n/g, '')
                // eslint-disable-next-line quotes
                .replace(/"/g, "'")
                .replace(/\\'/g, '"')
                .replace(/\w+:/g, (matched) => {
                  return `"${matched.replace(':', '')}":`;
                })
            );
          }}
        />
        <Button
          label="Parse"
          onClick={() => {
            const parsed = parseObject(content.replace(/\"/g, '\\"').replace(/\'/g, '"'));
            if (parsed) {
              onChange(parsed);
            }
          }}
        />
        <Button
          label="Object"
          onClick={() => {
            const result = content
              .replace(/['|"]{/g, '{')
              .replace(/}['|"]/g, '}')
              .replace(/["]\w+["]:/g, (matched) => {
                return matched.replace(/["]/g, '');
              });
            onChange(result);
          }}
        />
      </SCFileBtnWrapper>
    </SCFlexWrapper>
  );
};
