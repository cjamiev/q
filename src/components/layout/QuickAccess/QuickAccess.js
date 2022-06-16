import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { executeCommand } from 'components/molecules/Global/globalActions';
import {
  SCQuickAccess,
  SCQuickAccessBtnGroup,
  SCQuickAccessBtn,
  SCQuickAccessList,
  SCQuickAccessListBtn
} from './styles';
import { copyToClipboard } from 'utils/copy';
import useOnClickOutside from 'hooks/useOnClickOutside';
import { StarSVG } from 'components/atoms/Icons/StarSVG';
import { CopySVG } from 'components/atoms/Icons/CopySVG';
import { PlaySVG } from 'components/atoms/Icons/PlaySVG';

const QuickAccessList = ({ mode }) => {
  const dispatch = useDispatch();
  const { commands, links, copy } = useSelector((state) => state.settings);

  if (mode === 'e') {
    return (
      <>
        {commands.map((item, index) => {
          return (
            <SCQuickAccessListBtn
              key={item.label}
              onClick={() => {
                dispatch(executeCommand(item.value));
              }}
            >
              {item.label}
            </SCQuickAccessListBtn>
          );
        })}
      </>
    );
  }
  if (mode === 'l') {
    return (
      <>
        {links.map((item, index) => {
          return (
            <SCQuickAccessListBtn
              key={item.label}
              onClick={() => {
                window.open(item.value, '_blank');
              }}
            >
              {item.label}
            </SCQuickAccessListBtn>
          );
        })}
      </>
    );
  }
  if (mode === 'c') {
    return (
      <>
        {copy.map((item, index) => {
          return (
            <SCQuickAccessListBtn
              key={item.label}
              onClick={() => {
                copyToClipboard(item.value);
              }}
            >
              {item.label}
            </SCQuickAccessListBtn>
          );
        })}
      </>
    );
  } else {
    return null;
  }
};

const PageQuickAccess = () => {
  const ref = useRef();
  const [mode, setMode] = useState('');
  useOnClickOutside(ref, () => setMode(''));

  const showCommands = () => setMode('e');
  const showLinks = () => setMode('l');
  const showPaste = () => setMode('c');

  return (
    <SCQuickAccess ref={ref}>
      <SCQuickAccessBtnGroup>
        <SCQuickAccessBtn isActive={mode === 'e'} onClick={showCommands}>
          <PlaySVG ariaLabel="Commands" transform="scale(0.7) translate(10,10)" />
        </SCQuickAccessBtn>
        <SCQuickAccessBtn isActive={mode === 'l'} onClick={showLinks}>
          <StarSVG ariaLabel="Favorite Links" transform="scale(0.7) translate(10,10)" />
        </SCQuickAccessBtn>
        <SCQuickAccessBtn isActive={mode === 'c'} onClick={showPaste}>
          <CopySVG transform="scale(0.7) translate(10,10)" />
        </SCQuickAccessBtn>
      </SCQuickAccessBtnGroup>
      <SCQuickAccessList isVisible={mode !== ''}>
        <QuickAccessList mode={mode} />
      </SCQuickAccessList>
    </SCQuickAccess>
  );
};

export default PageQuickAccess;
