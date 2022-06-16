import React from 'react';
import { isNumber } from 'utils/type-check';

export const MODIFIER_TYPES = [
  { label: 'Global', value: 'g', selected: false },
  { label: 'Case Insensitive', value: 'i', selected: false },
  { label: 'Multiline', value: 'm', selected: false }
];

export const regexInfo = () => {
  return (
    <>
      <p>group: [abc]</p>
      <p>group negate: [^abc]</p>
      <p>group range: [a-z]</p>
      <p>or: a|b</p>
      <p>any except \n: .</p>
      <p>at least one: a+</p>
      <p>zero or more: a* </p>
      <p>zero or one: a?</p>
      <p>exactly n of a: a&#123;n&#125;</p>
      <p>n or more of a: a&#123;n,&#125;</p>
      <p>n to m of a: a&#123;n,m&#125;</p>
      <p>start of: ^</p>
      <p>end of: $</p>
      <p>newline: \n</p>
      <p>carriage: \r</p>
      <p>tab: \t</p>
      <p>null: \0</p>
      <p>\d = digit</p>
      <p>\w = alphanumeric</p>
      <p>\s = space, tab, newline, etc</p>
      <p>\D = not \d</p>
      <p>\W = not \w</p>
      <p>\S = not \s</p>
    </>
  );
};

export const formRegex = (expression, modifiers) => {
  try {
    return { regex: new RegExp(expression, modifiers), isValid: true };
  } catch (e) {
    return { regex: '', isValid: false };
  }
};

export const parsedContent = ({ content, replace, range, searchExp }) => {
  if (!searchExp.isValid) {
    return content;
  }

  return content.replace(searchExp.regex, (matchedKey) => {
    const startIndex = isNumber(Number(range.start)) ? Number(range.start) : ZERO;
    const endIndex = isNumber(Number(range.end)) ? Number(range.end) : content.length;
    if (endIndex && endIndex !== content.length) {
      return matchedKey.substr(startIndex, endIndex) + replace;
    }

    return replace || '';
  });
};
